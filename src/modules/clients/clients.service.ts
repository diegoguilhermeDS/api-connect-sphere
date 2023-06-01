import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private clientRepository: ClientRepository) {}
  async create(createClientDto: CreateClientDto) {
    const findClientByEmail = await this.clientRepository.findByEmail(
      createClientDto.email,
    );
    if (findClientByEmail) {
      throw new ConflictException('Client with this e-mail already exists');
    }

    const findClientByPhone = await this.clientRepository.findByPhone(
      createClientDto.phone,
    );
    if (findClientByPhone) {
      throw new ConflictException('Client with this phone already exists');
    }

    const newClient = await this.clientRepository.create(createClientDto);
    return newClient;
  }

  async findAll() {
    const clientsList = await this.clientRepository.findAll();
    return clientsList;
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async findByEmail(email: string) {
    const information = await this.clientRepository.findByEmail(email)
    return information
  }

  async findByEmailToAuth(email: string) {
    const client = await this.clientRepository.findByEmailToAuth(email)
    return client
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    const client = await this.clientRepository.findOne(id);
    if (!client || client.is_active == false) {
      throw new NotFoundException('Client not found');
    }

    if(id !== userId) {
      throw new ForbiddenException("Insufficient permission")
    }

    const clientUpdate = await this.clientRepository.update(id, updateClientDto);

    return clientUpdate;
  }

  async remove(id: string, userId: string) {
    const client = await this.clientRepository.findOne(id);
    if (!client || client.is_active == false) {
      throw new NotFoundException('Client not found');
    }

    if(id !== userId) {
      throw new ForbiddenException("Insufficient permission")
    }

    await this.clientRepository.delete(id);
    return;
  }
}
