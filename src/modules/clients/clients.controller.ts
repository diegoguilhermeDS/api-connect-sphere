import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InformationService } from '../information/information.service';
import { CreateInformationDto } from '../information/dto/create-information.dto';
import { UpdateInformationDto } from '../information/dto/update-information.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist';
import { ResponseClientSwaggerDto } from './dto/swagger.dto';
import { ResponseInformationSwaggerDto } from '../information/dto/swagger.dto';
import { badRequestDto } from 'src/swagger/badRequest.dto';
import { ErrorDto } from 'src/swagger/Error.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly informationService: InformationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'Create a new client',
    type: ResponseClientSwaggerDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: badRequestDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Client with phone or email already exists',
    type: ErrorDto,
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all clients' })
  @ApiResponse({
    status: 200,
    description: 'List all clients',
    type: ResponseClientSwaggerDto,
    isArray: true,
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a client' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to bring a client',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a client',
    type: ResponseClientSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Client Not Found',
    type: ErrorDto,
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a client' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to update a client',
  })
  @ApiResponse({
    status: 200,
    description: 'Update a client',
    type: ResponseClientSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Client Not Found',
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
    @Body() updateClientDto: UpdateClientDto,
    @Request() req,
  ) {
    return this.clientsService.update(id, updateClientDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to delete a client',
  })
  @ApiResponse({
    status: 204,
    description: 'Delete a client',
  })
  @ApiResponse({
    status: 404,
    description: 'Client Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.clientsService.remove(id, req.user.id);
  }

  @Post(':id/infor')
  @ApiOperation({ summary: 'Create a new information by client' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'inform an ID to crete a information to the client',
  })
  @ApiResponse({
    status: 201,
    description: 'Create a new information',
    type: ResponseInformationSwaggerDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Client Not Found',
    type: ErrorDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient permission',
    type: ErrorDto,
  })
  @UseGuards(JwtAuthGuard)
  createInformation(
    @Param('id') id: string,
    @Body() createInformationDto: CreateInformationDto,
    @Request() req,
  ) {
    return this.informationService.create(
      id,
      createInformationDto,
      req.user.id,
      'client',
    );
  }

  @Patch('infor/:inforId')
  @ApiOperation({ summary: 'Update a information by client' })
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
  updateInformation(
    @Param('inforId') inforId: string,
    @Body() UpdateInformationDto: UpdateInformationDto,
    @Request() req,
  ) {
    return this.informationService.update(
      inforId,
      UpdateInformationDto,
      req.user.id,
      'client',
    );
  }

  @Delete('infor/:inforId')
  @ApiOperation({ summary: 'Delete a information by client' })
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
  removeInformation(@Param('inforId') inforId: string, @Request() req) {
    return this.informationService.remove(inforId, req.user.id, 'client');
  }
}
