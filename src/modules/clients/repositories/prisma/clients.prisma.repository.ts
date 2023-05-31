import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../clients.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from '../../dto/create-client.dto';
import { Client } from '../../entities/client.entity';
import { plainToInstance } from 'class-transformer';
import { Information } from 'src/modules/information/entities/information.entity';
import { UpdateClientDto } from '../../dto/update-client.dto';

@Injectable()
export class ClientPrismaRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClientDto): Promise<Client> {
    const client = new Client();
    const infor = new Information();

    const { email, phone, ...rest } = data;
    const dataInformation = { email: email, phone: phone };

    Object.assign(infor, { ...dataInformation });
    Object.assign(client, { ...rest });

    const newClient = await this.prisma.client.create({
      data: {
        ...client,
        information: {
          create: [{ ...infor }],
        },
      },
      include: {
        information: {
          select: {
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return plainToInstance(Client, newClient);
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      where: { is_active: true },
      include: {
        information: {
          select: {
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return plainToInstance(Client, clients);
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        information: {
          select: {
            id: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return plainToInstance(Client, client);
  }

  async findByEmail(email: string): Promise<Client> {
    const infor = await this.prisma.information.findUnique({
      where: {
        email,
      },
      select: {
        client: true,
      },
    });
    if (infor) {
      return infor.client
    }

    return null;
  }

  async findByPhone(phone: string): Promise<Client> {
    const infor = await this.prisma.information.findUnique({
      where: {
        phone,
      },
      select: {
        client: true,
      },
    });

    if (infor) {
      return plainToInstance(Client, infor.client);
    }

    return null;
  }

  async update(id: string, data: UpdateClientDto): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Client, client);
  }

  async delete(id: string): Promise<void> {
    const client = await this.prisma.client.update({
      where: { id: id },
      data: { is_active: false },
    });
  }
}