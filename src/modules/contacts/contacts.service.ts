import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactsDto } from './dto/create-contact.dto';
import { UpdateContactsDto } from './dto/update-contact.dto';
import { ContactRepository } from './repositories/contacts.repository';


@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactRepository) {}
  async create(createcontactsDto: CreateContactsDto, clientId: string) {
    const findContactByEmail = await this.contactRepository.findByEmail(
      createcontactsDto.email,
    );
    if (findContactByEmail) {
      throw new ConflictException('Contact with this e-mail already exists');
    }

    const findContactByPhone = await this.contactRepository.findByPhone(
      createcontactsDto.phone,
    );
    if (findContactByPhone) {
      throw new ConflictException('Contact with this phone already exists');
    }

    const newContact = await this.contactRepository.create(createcontactsDto, clientId);

    return newContact
  }

  async findAll(clientId: string) {
    const contactsList = await this.contactRepository.findAll(clientId);
    return contactsList
  }

  async findOne(id: string, clientId: string) {
    const contact = await this.contactRepository.findOne(id, clientId)
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }

    return contact
  }

  async update(id: string, updateContactsDto: UpdateContactsDto, clientId: string) {
    const contact = await this.contactRepository.findOne(id, clientId)
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }

    const contactUpdate = await this.contactRepository.update(id, updateContactsDto);

    return contactUpdate;
  }

  async remove(id: string, clientId: string) {
    const contact = await this.contactRepository.findOne(id, clientId)
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }

    await this.contactRepository.delete(id)

    return
  }
}
