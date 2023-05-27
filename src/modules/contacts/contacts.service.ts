import { Injectable } from '@nestjs/common';
import { CreatecontactsDto } from './dto/create-contact.dto';
import { UpdatecontactsDto } from './dto/update-contact.dto';


@Injectable()
export class contactsService {
  create(createcontactsDto: CreatecontactsDto) {
    return 'This action adds a new contacts';
  }

  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contacts`;
  }

  update(id: number, updatecontactsDto: UpdatecontactsDto) {
    return `This action updates a #${id} contacts`;
  }

  remove(id: number) {
    return `This action removes a #${id} contacts`;
  }
}
