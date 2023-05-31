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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InformationService } from '../information/information.service';
import { CreateInformationDto } from "../information/dto/create-information.dto"
import { UpdateInformationDto } from "../information/dto/update-information.dto"
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Request() req) {
    return this.clientsService.update(id, updateClientDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.clientsService.remove(id, req.user.id);
  } 

  @Post(":id/infor")
  @UseGuards(JwtAuthGuard)
  createInformation(@Param('id') id: string, @Body() createInformationDto: CreateInformationDto, @Request() req) {
    return this.informationService.create(id, createInformationDto, req.user.id, "client")
  }

  @Patch("infor/:inforId")
  @UseGuards(JwtAuthGuard)
  updateInformation(@Param('inforId') inforId: string, @Body() UpdateInformationDto: UpdateInformationDto, @Request() req) {
    return this.informationService.update(inforId, UpdateInformationDto, req.user.id, "client")
  }

  @Delete("infor/:inforId")
  @UseGuards(JwtAuthGuard)
  removeInformation(@Param('inforId') inforId: string, @Request() req){
    return this.informationService.remove(inforId, req.user.id, "client")
  }
}
