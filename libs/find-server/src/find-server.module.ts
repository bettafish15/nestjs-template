import { Module } from '@nestjs/common';
import { FindServerService } from './find-server.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FindServerService],
  exports: [FindServerService],
})
export class FindServerModule {}
