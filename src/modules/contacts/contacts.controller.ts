import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactsDto } from './dto/create-contact.dto';
import { UpdateContactsDto } from './dto/update-contact.dto';
import { CreateInformationDto } from '../information/dto/create-information.dto';
import { InformationService } from '../information/information.service';
import { UpdateInformationDto } from '../information/dto/update-information.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService, private readonly informationService: InformationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createcontactsDto: CreateContactsDto, @Request() req) { 
    return this.contactsService.create(createcontactsDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.contactsService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.contactsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatecontactsDto: UpdateContactsDto,
    @Request() req
  ) {
    return this.contactsService.update(id, updatecontactsDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.contactsService.remove(id, req.user.id);
  }

  @Post(":id/infor")
  @UseGuards(JwtAuthGuard)
  createInformation(@Param('id') id: string, @Body() createInformationDto: CreateInformationDto, @Request() req) {
    return this.informationService.create(id, createInformationDto, req.user.id, "contact")
  }

  @Patch("infor/:inforId")
  @UseGuards(JwtAuthGuard)
  updateInformation(@Param('inforId') inforId: string, @Body() UpdateInformationDto: UpdateInformationDto, @Request() req) {
    return this.informationService.update(inforId, UpdateInformationDto, req.user.id, "contact")
  }

  @Delete("infor/:inforId")
  @UseGuards(JwtAuthGuard)
  removeInformation(@Param('inforId') inforId: string, @Request() req){
    return this.informationService.remove(inforId, req.user.id, "contact")
  }
}
