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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { ResponseContactSwaggerDto } from './dto/swagger.dto';
import { badRequestDto } from 'src/swagger/badRequest.dto';
import { ErrorDto } from 'src/swagger/Error.dto';
import { ResponseInformationSwaggerDto } from '../information/dto/swagger.dto';

@ApiTags('Contacts')

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService, private readonly informationService: InformationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({
    status: 201,
    description: 'Create a new contact',
    type: ResponseContactSwaggerDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: badRequestDto,
  })
  @ApiResponse({
    status: 409,
    description: 'contact with phone or email already exists',
    type: ErrorDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createcontactsDto: CreateContactsDto, @Request() req) { 
    return this.contactsService.create(createcontactsDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all contact' })
  @ApiResponse({
    status: 200,
    description: 'List all contact',
    type: ResponseContactSwaggerDto,
    isArray: true
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.contactsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to bring a contact',
    
  })
  @ApiOperation({ summary: 'Retrieve a contact' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a contact',
    type: ResponseContactSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Contact Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.contactsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to update a contact',
    
  })
  @ApiOperation({ summary: 'Update a contact' })
  @ApiResponse({
    status: 200,
    description: 'Update a contact',
    type: ResponseContactSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Contact Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatecontactsDto: UpdateContactsDto,
    @Request() req
  ) {
    return this.contactsService.update(id, updatecontactsDto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to delete a contact',
    
  })
  @ApiOperation({ summary: 'Delete a contact' })
  @ApiResponse({
    status: 204,
    description: 'Delete a contact',
    type: ResponseContactSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Contact Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.contactsService.remove(id, req.user.id);
  }

  @Post(":id/infor")
  @ApiOperation({ summary: 'Create a new information by contact' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to crete a information to the contact',
  })
  @ApiResponse({
    status: 201,
    description: 'Create a new information',
    type: ResponseInformationSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Contact Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  createInformation(@Param('id') id: string, @Body() createInformationDto: CreateInformationDto, @Request() req) {
    return this.informationService.create(id, createInformationDto, req.user.id, "contact")
  }

  @Patch("infor/:inforId")
  @ApiOperation({ summary: 'Update a information by contact' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'inforId',
    type: String,
    required: true,
    description: 'inform an INFORMATION ID to update a information',
    
  })
  @ApiResponse({
    status: 200,
    description: 'Update a information',
    type: ResponseInformationSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Information Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  updateInformation(@Param('inforId') inforId: string, @Body() UpdateInformationDto: UpdateInformationDto, @Request() req) {
    return this.informationService.update(inforId, UpdateInformationDto, req.user.id, "contact")
  }

  @Delete("infor/:inforId")
  @ApiOperation({ summary: 'Delete a information by contact' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'inforId',
    type: String,
    required: true,
    description: 'inform an INFORMATION ID to delete a information',
    
  })
  @ApiResponse({
    status: 204,
    description: 'Delete a information',
  })
  @ApiResponse({
    status: 404,
    description: 'Information Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  removeInformation(@Param('inforId') inforId: string, @Request() req){
    return this.informationService.remove(inforId, req.user.id, "contact")
  }
}
