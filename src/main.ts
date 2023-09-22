import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ApiEnv } from './interface/swagger.type';

function setupSwagger(
  prefix: string,
  app: INestApplication,
  apiEnv: ConfigService<ApiEnv>,
): void {
  const isEnableSwagger = apiEnv.get('API_SWAGGER_ENABLE');
  // Check if swagger is available or not
  if (!isEnableSwagger) return;

  const documentBuilder = new DocumentBuilder()
    .setTitle(apiEnv.get('API_TITLE') as string)
    .setDescription(apiEnv.get('API_DESCRIPTION') as string)
    .setVersion(apiEnv.get('API_VERSION') as string)
    .addTag(apiEnv.get('API_TAG') as string);

  if (apiEnv.get('API_BEARER_AUTH')) {
    documentBuilder.addBearerAuth();
  }

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    documentBuilder.build(),
  );
  const path = `${prefix}/${apiEnv.get<string>('API_SWAGGER_PATH')}`;

  SwaggerModule.setup(path, app, swaggerDocument);
  Logger.log(`Swagger mapped to /${path}`, 'shared-swagger');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(ConfigService) as ConfigService<ApiEnv>;
  setupSwagger(`api/v${env.get('API_VERSION') || '1'}`, app, env);
  await app.listen(3000);
}
bootstrap();
