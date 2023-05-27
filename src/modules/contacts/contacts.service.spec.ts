import { Test, TestingModule } from '@nestjs/testing';
import { contactsService } from './contacts.service';

describe('contactsService', () => {
  let service: contactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [contactsService],
    }).compile();

    service = module.get<contactsService>(contactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
