import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InformationService } from '../information/information.service';
import { CreateInformationDto } from "../information/dto/create-information.dto"
import { UpdateInformationDto } from "../information/dto/update-information.dto"

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService, private readonly informationService: InformationService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

   @Get()
  findAll() {
    return this.clientsService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  } 

  @Post(":id/infor")
  createInformation(@Param('id') id: string, @Body() createInformationDto: CreateInformationDto) {
    return this.informationService.create(id, createInformationDto)
  }

  @Patch("infor/:id")
  updateInformation(@Param('id') inforId: string, @Body() UpdateInformationDto: UpdateInformationDto) {
    return this.informationService.update(inforId, UpdateInformationDto)
  }

  @Delete("infor/:inforId")
  removeInformation(@Param('inforId') inforId: string){
    return this.informationService.remove(inforId)
  }
}
