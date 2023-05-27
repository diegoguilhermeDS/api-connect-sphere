import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../clients.repository';
import { Client } from '../../entities/client.entity';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { clients } from 'src/database/db';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientInMemoryRepository implements ClientRepository {
  create(data: CreateClientDto): Promise<Client> | Client {
    const newClient = new Client();
    Object.assign(newClient, {
      ...data,
    });

    clients.push(newClient);
    return plainToInstance(Client, newClient);
  }
  /* findAll(): Promise<Client[]> | Client[] {}
  findOne(id: string): Promise<Client> | Client {}
  update(id: string, data: UpdateClientDto): Promise<Client> | Client {}
  delete(id: string): Promise<void> | void {} */
}
