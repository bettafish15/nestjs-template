import { FindServerService } from '@app/find-server';
import { ServerInfo } from '@app/find-server/interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private findServerService: FindServerService) {}

  async findServer(): Promise<ServerInfo> {
    return this.findServerService.findServer();
  }
}
