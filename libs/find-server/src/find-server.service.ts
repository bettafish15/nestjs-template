import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ServerInfo } from './interface';
import { lastValueFrom } from 'rxjs';
import { servers } from './const';

@Injectable()
export class FindServerService {
  constructor(private httpService: HttpService) {}

  async checkServerStatus(server: string): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(server, { timeout: 5000 }),
      );

      return response.status >= 200 && response.status < 300;
    } catch (err) {
      Logger.log(`FindServerService.checkServerStatus: ${err.message}`);
      return false;
    }
  }

  // finds online servers and returns the server with lowest priority
  async findServer(): Promise<ServerInfo> {
    const onlineServers = await Promise.all(
      (servers as ServerInfo[]).map(async (server) => ({
        server,
        isOnline: await this.checkServerStatus(server.url),
      })),
    );

    const availableOnlineServers = onlineServers.filter(
      (server) => server.isOnline,
    );

    if (availableOnlineServers.length === 0) {
      throw new Error('No online servers found.');
    }

    availableOnlineServers.sort(
      (a, b) => a.server.priority - b.server.priority,
    );

    return availableOnlineServers[0].server;
  }
}
