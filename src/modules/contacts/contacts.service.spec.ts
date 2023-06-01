import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';

describe('contactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsService],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
