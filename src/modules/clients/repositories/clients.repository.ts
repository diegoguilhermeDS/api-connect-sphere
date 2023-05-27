import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';

export abstract class ClientRepository {
  abstract create(data: CreateClientDto): Promise<Client> | Client;
 /*  abstract findAll(): Promise<Client[]> | Client[];
  abstract findOne(
    id: string,
  ): Promise<Client | undefined> | Client | undefined;
  abstract update(id: string, data: UpdateClientDto): Promise<Client> | Client;
  abstract delete(id: string): Promise<void> | void; */
}
