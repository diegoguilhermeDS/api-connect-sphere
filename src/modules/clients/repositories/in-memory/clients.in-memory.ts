import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../clients.repository';
import { Client } from '../../entities/client.entity';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { clients, information } from 'src/database/db';
import { plainToInstance } from 'class-transformer';
import { Information } from 'src/modules/information/entities/information.entity';

@Injectable()
export class ClientInMemoryRepository implements ClientRepository {
  create(data: CreateClientDto): Promise<Client> | Client {
    const newInfor = new Information();
    const newClient = new Client();

    const dataInformation = {
      client_id: newClient.id,
      email: data.email,
      phone: data.phone,
    };
    const dataClient = { name: data.name, password: data.password };

    Object.assign(newInfor, { ...dataInformation });
    Object.assign(newClient, { ...dataClient });

    clients.push(newClient);
    information.push(newInfor);
    return plainToInstance(Client, { ...newClient, ...data });
  }

  findAll(): Promise<Client[]> | Client[] {
    const clientsList = clients.filter((client) => client.is_active == true);

    const clientsFullInfor = clientsList.map((client) => {
      const inforClient = information.find(
        (infor) => infor.clientId == client.id,
      );
      return { ...client, email: inforClient.email, phone: inforClient.phone };
    });

    return plainToInstance(Client, clientsFullInfor);
  }

  findOne(id: string): Promise<Client> | Client {
    const client = clients.find((client) => client.id == id);
    return plainToInstance(Client, client);
  }

  findByEmail(email: string): Promise<Information> | Information {
    const infor = information.find((infor) => infor.email == email);

    return plainToInstance(Information, infor);
  }

  findByEmailToAuth(email: string): Information & {
    client: Client;
  } {
    const infor = information.find((infor) => infor.email == email);

    const client = clients.find((client) => client.id == infor.clientId);
    const responseInformation = {
      ...infor,
      client: client,
    };

    return responseInformation;
  }

  findByPhone(phone: string): Information | Promise<Information> {
    const infor = information.find((infor) => infor.phone == phone);

    return plainToInstance(Information, infor);
  }

  update(id: string, data: UpdateClientDto): Promise<Client> | Client {
    const clientIndex = clients.findIndex((client) => client.id == id);
    clients[clientIndex] = { ...clients[clientIndex], ...data };

    return plainToInstance(Client, clients[clientIndex]);
  }

  delete(id: string): Promise<void> | void {
    const client = clients.find((client) => client.id == id);
    client.is_active = false;
  }
}
