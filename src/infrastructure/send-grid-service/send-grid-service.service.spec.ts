import { Test, TestingModule } from '@nestjs/testing';
import { SendGridServiceService } from './send-grid-service.service';

describe('SendGridServiceService', () => {
  let service: SendGridServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendGridServiceService],
    }).compile();

    service = module.get<SendGridServiceService>(SendGridServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
