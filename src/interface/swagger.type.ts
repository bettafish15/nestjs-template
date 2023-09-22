import { IsBoolean, IsString } from '@nestjs/class-validator';

export class ApiEnv {
  @IsBoolean()
  API_SWAGGER_ENABLE!: boolean;

  @IsString()
  API_SWAGGER_PATH!: string;

  @IsString()
  API_VERSION!: string;

  @IsString()
  API_TITLE!: string;

  @IsString()
  API_DESCRIPTION!: string;

  @IsString()
  API_TAG!: string;

  @IsBoolean()
  API_BEARER_AUTH!: boolean;
}
