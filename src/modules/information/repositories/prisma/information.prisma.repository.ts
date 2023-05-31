import { Injectable, NotFoundException } from '@nestjs/common';
import { InformationRepository } from '../information.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateInformationDto } from '../../dto/create-information.dto';
import { Information } from '../../entities/information.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateInformationDto } from '../../dto/update-information.dto';
import { Contact } from 'src/modules/contacts/entities/contact.entity';

@Injectable()
export class InformationPrismaRepository implements InformationRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    id: string,
    data: CreateInformationDto,
    typeUser: string,
  ): Promise<Information> {
    const inforData = new Information();

    Object.assign(inforData, { ...data });

    if (typeUser === 'client') {
      const client = await this.prisma.client.findUnique({
        where: { id },
      });
      if (!client) {
        throw new NotFoundException('Client not found');
      }

      inforData.clientId = client.id;
    } else {
      const contact = await this.prisma.contact.findUnique({
        where: { id },
      });
      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      inforData.contactId = contact.id;
    }

    const newInformation = await this.prisma.information.create({
      data: { ...inforData },
    });

    return plainToInstance(Information, newInformation);
  }

  async findInforByEmail(email: string): Promise<Information> {
    const information = await this.prisma.information.findUnique({
      where: { email },
    });

    return information;
  }

  async findInforByPhone(phone: string): Promise<Information> {
    const information = await this.prisma.information.findUnique({
      where: { phone },
    });

    return information;
  }

  async findOne(inforId: string): Promise<Information> {
    const information = await this.prisma.information.findUnique({
      where: { id: inforId },
    });

    return plainToInstance(Information, information);
  }

  async findContact(contactId: string): Promise<String> {
    const contact = await this.prisma.contact.findUnique({
      where: { id: contactId },
      include: {
        client: true
      }
    });

    if (contact) {
      return contact.clientId
    }

    return null

  }

  async update(
    inforId: string,
    data: UpdateInformationDto,
  ): Promise<Information> {
    const informationUpdate = await this.prisma.information.update({
      where: { id: inforId },
      data: { ...data },
    });

    return plainToInstance(Information, informationUpdate);
  }

  async delete(inforId: string): Promise<void> {
    await this.prisma.information.delete({ where: { id: inforId } });
    return;
  }
}
