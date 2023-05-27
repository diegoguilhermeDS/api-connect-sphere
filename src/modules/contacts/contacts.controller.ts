import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { contactsService } from './contacts.service';
import { CreatecontactsDto } from './dto/create-contact.dto';
import { UpdatecontactsDto } from './dto/update-contact.dto';


@Controller('contacts')
export class contactsController {
  constructor(private readonly contactsService: contactsService) {}

  @Post()
  create(@Body() createcontactsDto: CreatecontactsDto) {
    return this.contactsService.create(createcontactsDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatecontactsDto: UpdatecontactsDto,
  ) {
    return this.contactsService.update(+id, updatecontactsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
