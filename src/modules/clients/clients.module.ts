import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientRepository } from './repositories/clients.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ClientPrismaRepository } from './repositories/prisma/clients.prisma.repository';
import { InformationModule } from '../information/information.module';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    PrismaService,
    { provide: ClientRepository, useClass: ClientPrismaRepository },
  ],
  imports: [InformationModule],
})
export class ClientsModule {}
