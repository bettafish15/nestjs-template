import { Test, TestingModule } from '@nestjs/testing';
import { FindServerService } from './find-server.service';
import { HttpModule } from '@nestjs/axios';

describe('FindServerService', () => {
  let service: FindServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FindServerService],
    }).compile();

    service = module.get<FindServerService>(FindServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
