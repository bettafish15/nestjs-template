import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ServerInfo } from '@app/find-server/interface';

@Controller('findServer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findServer(): Promise<ServerInfo> {
    return this.appService.findServer();
  }
}
