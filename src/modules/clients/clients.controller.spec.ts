import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { InformationService } from '../information/information.service';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { createClientMock, updateClientMock } from '../../../test/mock/client';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateInformationDto } from '../information/dto/create-information.dto';
import {
  createInformationMock,
  updateInformationMock,
} from '../../../test/mock/information';
import { Information } from '../information/entities/information.entity';
import { UpdateInformationDto } from '../information/dto/update-information.dto';

const clientEntityList: Client[] = [
  new Client({ name: 'kenzinhoMK1', password: '1234ABC' }),
  new Client({ name: 'kenzinhoMK2', password: '1234CBA' }),
  new Client({ name: 'kenzinhoMK3', password: '1234ACB' }),
];

const informationEntityList: Information[] = [
  new Information({
    email: 'InformationMock1@mail.com',
    phone: '988554478',
    clientId: clientEntityList[0].id,
  }),
  new Information({
    email: 'InformationMock2@mail.com',
    phone: '988554445',
    clientId: clientEntityList[0].id,
  }),
  new Information({
    email: 'InformationMock3@mail.com',
    phone: '988554464',
    clientId: clientEntityList[0].id,
  }),
];

const newClient = new Client({
  name: 'kenzinho CREATED',
  password: '1234admin',
});

const updateClient = new Client({
  name: 'kenzinho UPDATE',
  password: '1234update',
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

describe('ClientsController', () => {
  let clientController: ClientsController;
  let clientService: ClientsService;
  let informationService: InformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newClient),
            findAll: jest.fn().mockResolvedValue(clientEntityList),
            findOne: jest.fn().mockResolvedValue(clientEntityList[0]),
            update: jest.fn().mockResolvedValue(updateClient),
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

    clientController = module.get<ClientsController>(ClientsController);
    clientService = module.get<ClientsService>(ClientsService);
    informationService = module.get<InformationService>(InformationService);
  });

  it('should be defined', () => {
    expect(clientController).toBeDefined();
  });

  describe('POST /clients', () => {
    it('Sucess: Must be albe to create a client', async () => {
      const body: CreateClientDto = createClientMock.client;

      const result = await clientController.create(body);

      expect(result).toEqual(newClient);
    });

    it('Error: Must not be albe to create a client', () => {
      jest.spyOn(clientService, 'create').mockRejectedValueOnce(new Error());

      const body: CreateClientDto = {
        name: 'kenzinho CREATED',
        email: 'kenzinho.created@mail.com',
        phone: '988995566',
        password: '1234admin',
      };

      expect(clientController.create(body)).rejects.toThrowError();
    });
  });

  describe('GET /clients', () => {
    it('Success: Must be able to retrieve the clients', async () => {
      const result = await clientController.findAll();

      expect(result).toEqual(clientEntityList);
    });

    it('Error: Must not be able to retrieve the clients', () => {
      jest.spyOn(clientService, 'findAll').mockRejectedValueOnce(new Error());

      expect(clientController.findAll()).rejects.toThrowError();
    });
  });

  describe('GET /clients/:id', () => {
    it('Success: Must be able to retrieve a client', async () => {
      const result = await clientController.findOne(clientEntityList[0].id);

      expect(result).toEqual(clientEntityList[0]);
    });

    it('Error: Must not be able to retrieve a client', () => {
      jest.spyOn(clientService, 'findOne').mockRejectedValueOnce(new Error());

      expect(
        clientService.findOne(clientEntityList[0].id),
      ).rejects.toThrowError();
    });
  });

  describe('PATCH /clients/:id', () => {
    it('Success: Must be albe to update a client', async () => {
      const body: UpdateClientDto = updateClientMock.clientUpdate;

      const result = await clientController.update(
        clientEntityList[0].id,
        body,
        request,
      );

      expect(result).toEqual(updateClient);
    });

    it('Error: Must not be albe to update a client', () => {
      jest.spyOn(clientService, 'update').mockRejectedValueOnce(new Error());

      const body: UpdateClientDto = updateClientMock.clientUpdate;

      expect(
        clientController.update(clientEntityList[0].id, body, request),
      ).rejects.toThrowError();
    });
  });

  describe('DELETE /clients/:id', () => {
    it('Success: Must be albe to delete a client', async () => {

      const result = await clientController.remove(
        clientEntityList[0].id,
        request,
      );

      expect(result).toBeUndefined();
    });

    it('Error: Must not be albe to delete a client', () => {
      jest.spyOn(clientService, 'remove').mockRejectedValueOnce(new Error());

      expect(
        clientController.remove(clientEntityList[0].id, request),
      ).rejects.toThrowError();
    });
  });

  describe('POST /clients/:id/infor', () => {
    it('Success: Must be albe to create a information for client', async () => {
      const body: CreateInformationDto = createInformationMock.information;

      const result = await clientController.createInformation(
        clientEntityList[0].id,
        body,
        request,
      );
      expect(result).toEqual(newInformation);
    });

    it('Error: Must not be albe to create a information for client', () => {
      jest
        .spyOn(informationService, 'create')
        .mockRejectedValueOnce(new Error());

      const body: CreateInformationDto = createInformationMock.information;

      expect(
        clientController.createInformation(
          clientEntityList[0].id,
          body,
          request,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('PATCH /clients/infor/:inforId', () => {
    it('Success: Must be able update a information by client', async () => {
      const body: UpdateInformationDto =
        updateInformationMock.informationUpdate;

      const result = await clientController.updateInformation(
        informationEntityList[0].id,
        body,
        request,
      );

      expect(result).toEqual(updateInformation);
    });

    it('Error: Must not be albe to update a information by client', () => {
      jest
        .spyOn(informationService, 'update')
        .mockRejectedValueOnce(new Error());

      const body: UpdateInformationDto =
        updateInformationMock.informationUpdate;

      expect(
        clientController.updateInformation(
          informationEntityList[0].id,
          body,
          request,
        ),
      ).rejects.toThrowError();
    });
  });

  describe('DELETE /clients/infor/:inforId', () => {
    it('Success: Must be able to delete a information by client', async () => {
      const result = await clientController.removeInformation(
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
        clientController.removeInformation(
          informationEntityList[0].id,
          request,
        ),
      ).rejects.toThrowError();
    });
  });
});
