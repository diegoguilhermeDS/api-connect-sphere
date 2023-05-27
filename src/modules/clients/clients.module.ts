import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientRepository } from './repositories/clients.repository';
import { ClientInMemoryRepository } from './repositories/in-memory/clients.in-memory';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, {provide: ClientRepository, useClass: ClientInMemoryRepository}],
})
export class ClientsModule {}
