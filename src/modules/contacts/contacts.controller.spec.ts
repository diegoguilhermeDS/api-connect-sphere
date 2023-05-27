import { Test, TestingModule } from '@nestjs/testing';
import { contactsController } from './contacts.controller';
import { contactsService } from './contacts.service';

describe('contactsController', () => {
  let controller: contactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [contactsController],
      providers: [contactsService],
    }).compile();

    controller = module.get<contactsController>(contactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
