import { ForbiddenException, Injectable } from '@nestjs/common';
import { ContactRepository } from '../contacts.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateContactsDto } from '../../dto/create-contact.dto';
import { UpdateContactsDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { Information } from 'src/modules/information/entities/information.entity';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class ContactPrismaRepository implements ContactRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactsDto, clientId: string): Promise<Contact> {
    const contact = new Contact();
    const infor = new Information();

    const { email, phone, ...rest } = data;
    const dataInformation = { email: email, phone: phone };

    Object.assign(infor, { ...dataInformation });
    Object.assign(contact, { ...rest });

    const newContact = await this.prisma.contact.create({
      data: {
        ...contact,
        information: {
          create: [{ ...infor }],
        },
        client: {
          connect: { id: clientId },
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

    return plainToInstance(Contact, newContact);
  }

  async findAll(clientId: string): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: { clientId: clientId },
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

    return plainToInstance(Contact, contacts);
  }

  async findOne(id: string, clientId: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
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

    if (contact.clientId !== clientId) {
      throw new ForbiddenException('Insufficient permission');
    }

    return contact;
  }

  async findByEmail(email: string): Promise<Information> {
    const infor = await this.prisma.information.findUnique({
      where: {
        email,
      },
    });
    if (infor) {
      return infor;
    }

    return null;
  }

  async findByEmailToAuth(email: string): Promise<Contact> {
    const infor = await this.prisma.information.findUnique({
      where: {
        email,
      },
      include: {
        contact: true,
      },
    });
    if (infor) {
      return infor.contact;
    }
  }

  async findByPhone(phone: string): Promise<Information> {
    const infor = await this.prisma.information.findUnique({
      where: {
        phone,
      },
    });

    if (infor) {
      return plainToInstance(Information, infor);
    }

    return null;
  }

  async update(id: string, data: UpdateContactsDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
      include: {
        information: {
          select: {
            id: true,
            email: true,
            phone: true,
          },
        }
      }
    });

    return plainToInstance(Contact, contact)
  }

  async delete(id: string): Promise<void> {
    const contact = await this.prisma.contact.delete({
      where: {id}
    })
  }
}
