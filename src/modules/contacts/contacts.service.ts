import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactsDto } from './dto/create-contact.dto';
import { UpdateContactsDto } from './dto/update-contact.dto';
import { ContactRepository } from './repositories/contacts.repository';


@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactRepository) {}
  async create(createcontactsDto: CreateContactsDto) {
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

    const newContact = await this.contactRepository.create(createcontactsDto);

    return newContact
  }

  async findAll() {
    const contactsList = await this.contactRepository.findAll();
    return contactsList
  }

  async findOne(id: string) {
    const contact = await this.contactRepository.findOne(id)
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }

    return contact
  }

  async update(id: string, updateContactsDto: UpdateContactsDto) {
    const contact = await this.contactRepository.findOne(id)
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }

    const contactUpdate = await this.contactRepository.update(id, updateContactsDto);

    return contactUpdate;
  }

  async remove(id: string) {
    const contact = await this.contactRepository.findOne(id)
    if (!contact) {
      throw new NotFoundException("Contact not found")
    }

    await this.contactRepository.delete(id)

    return
  }
}
