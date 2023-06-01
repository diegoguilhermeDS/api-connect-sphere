import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { InformationService } from '../information/information.service';
import { CreateContactsDto } from './dto/create-contact.dto';
import {
  createContactMock,
  updateContactMock,
} from '../../../test/mock/contact';
import { Contact } from './entities/contact.entity';
import { Client } from '../clients/entities/client.entity';
import { UpdateContactsDto } from './dto/update-contact.dto';
import { CreateInformationDto } from '../information/dto/create-information.dto';
import { createInformationMock, updateInformationMock } from '../../../test/mock/information';
import { Information } from '../information/entities/information.entity';
import { UpdateInformationDto } from '../information/dto/update-information.dto';

const contactEntityList: Contact[] = [
  new Contact({ name: 'kenzinhoMK1' }),
  new Contact({ name: 'kenzinhoMK2' }),
  new Contact({ name: 'kenzinhoMK3' }),
];

const informationEntityList: Information[] = [
  new Information({
    email: 'InformationMock1@mail.com',
    phone: '988554478',
    clientId: contactEntityList[0].id,
  }),
  new Information({
    email: 'InformationMock2@mail.com',
    phone: '988554445',
    clientId: contactEntityList[0].id,
  }),
  new Information({
    email: 'InformationMock3@mail.com',
    phone: '988554464',
    clientId: contactEntityList[0].id,
  }),
];

const clientEntityList: Client[] = [
  new Client({ name: 'kenzinhoMK1', password: '1234ABC' }),
];

const newContact = new Contact({
  name: 'Pato Donald CREATED',
});

const updateContact = new Contact({
  name: 'Pato Donald UPDATE',
});

const newInformation = new Information({
  email: 'createdInformationMock@mail.com',
  phone: '988554478',
  clientId: clientEntityList[0].id,
});

const updateInformation = new Information({
  email: 'updateInformationMock@mail.com',
  phone: '988554471',
});

const request = {
  user: clientEntityList[0],
};

describe('contactsController', () => {
  let contactController: ContactsController;
  let contactService: ContactsService;
  let informationService: InformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newContact),
            findAll: jest.fn().mockResolvedValue(contactEntityList),
            findOne: jest.fn().mockResolvedValue(contactEntityList[0]),
            update: jest.fn().mockResolvedValue(updateContact),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: InformationService,
          useValue: {
            create: jest.fn().mockResolvedValue(newInformation),
            update: jest.fn().mockResolvedValue(updateInformation),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    contactController = module.get<ContactsController>(ContactsController);
    contactService = module.get<ContactsService>(ContactsService);
    informationService = module.get<InformationService>(InformationService);
  });

  it('should be defined', () => {
    expect(contactController).toBeDefined();
  });

  describe('POST /contacts', () => {
    it('Sucess: Must be albe to create a contact', async () => {
      const body: CreateContactsDto = createContactMock.newContact;

      const result = await contactController.create(body, request);

      expect(result).toEqual(newContact);
    });

    it('Error: Must not be albe to create a contact', () => {
      jest.spyOn(contactService, 'create').mockRejectedValueOnce(new Error());

      const body: CreateContactsDto = createContactMock.newContact;

      expect(contactController.create(body, request)).rejects.toThrowError();
    });
  });

  describe('GET /contacts', () => {
    it('Success: Must be able to retrieve the contacts', async () => {
      const result = await contactController.findAll(request);

      expect(result).toEqual(contactEntityList);
    });

    it('Error: Must not be able to retrieve the contacts', () => {
      jest.spyOn(contactService, 'findAll').mockRejectedValueOnce(new Error());

      expect(contactController.findAll(request)).rejects.toThrowError();
    });
  });

  describe('GET /contacts/:id', () => {
    it('Success: Must be able to retrieve a contact', async () => {
      const result = await contactController.findOne(
        contactEntityList[0].id,
        request,
      );

      expect(result).toEqual(contactEntityList[0]);
    });

    it('Error: Must not be able to retrieve a contact', () => {
      jest.spyOn(contactService, 'findOne').mockRejectedValueOnce(new Error());

      expect(
        contactController.findOne(clientEntityList[0].id, request),
      ).rejects.toThrowError();
    });
  });

  describe('PATCH /contacts/:id', () => {
    it('Success: Must be albe to update a contact', async () => {
      const body: UpdateContactsDto = updateContactMock.contactUpdate;

      const result = await contactController.update(
        contactEntityList[0].id,
        body,
        request,
      );

      expect(result).toEqual(updateContact);
    });

    it('Error: Must not be albe to update a contact', () => {
      jest.spyOn(contactService, 'update').mockRejectedValueOnce(new Error());

      const body: UpdateContactsDto = updateContactMock.contactUpdate;

      expect(
        contactController.update(clientEntityList[0].id, body, request),
      ).rejects.toThrowError();
    });
  });

  describe('DELETE /contacts/:id', () => {
    it('Success: Must be albe to delete a contact', async () => {

      const result = await contactController.remove(
        contactEntityList[0].id,
        request,
      );

      expect(result).toBeUndefined();
    });

    it('Error: Must not be albe to delete a contact', () => {
      jest.spyOn(contactService, 'remove').mockRejectedValueOnce(new Error());

      expect(
        contactController.remove(contactEntityList[0].id, request),
      ).rejects.toThrowError();
    });
  });

  describe('POST /contacts/:id/infor', () => {
    it('Success: Must be albe to create a information for contact', async () => {
      const body: CreateInformationDto = createInformationMock.information;

      const result = await contactController.createInformation(
        contactEntityList[0].id,
        body,
        request,
      );
      expect(result).toEqual(newInformation);
    });

    it('Error: Must not be albe to create a information for contact', () => {
      jest
        .spyOn(informationService, 'create')
        .mockRejectedValueOnce(new Error());

      const body: CreateInformationDto = createInformationMock.information;

      expect(
        contactController.createInformation(
          clientEntityList[0].id,
          body,
          request,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('PATCH /contacts/infor/:inforId', () => {
    it('Success: Must be able update a information by contact', async () => {
      const body: UpdateInformationDto =
        updateInformationMock.informationUpdate;

      const result = await contactController.updateInformation(
        informationEntityList[0].id,
        body,
        request,
      );

      expect(result).toEqual(updateInformation);
    });

    it('Error: Must not be albe to update a information by contact', () => {
      jest
        .spyOn(informationService, 'update')
        .mockRejectedValueOnce(new Error());

      const body: UpdateInformationDto =
        updateInformationMock.informationUpdate;

      expect(
        contactController.updateInformation(
          informationEntityList[0].id,
          body,
          request,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('DELETE /contacts/infor/:inforId', () => {
    it('Success: Must be able to delete a information by client', async () => {
      const result = await contactController.removeInformation(
        informationEntityList[0].id,
        request,
      );

      expect(result).toBeUndefined();
    });

    it('Error: Must not be able to delete a information by client', () => {
      jest
        .spyOn(informationService, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(
        contactController.removeInformation(
          informationEntityList[0].id,
          request,
        ),
      ).rejects.toThrowError();
    });
  });
});
