import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { PrismaService } from 'src/database/prisma.service';
import { InformationRepository } from './repositories/information.repository';
import { InformationPrismaRepository } from './repositories/prisma/information.prisma.repository';
import { ClientsModule } from '../clients/clients.module';
import { ClientRepository } from '../clients/repositories/clients.repository';

@Module({
  providers: [
    InformationService,
    PrismaService,
    { provide: InformationRepository, useClass: InformationPrismaRepository },
  ],
  exports: [InformationService],
})
export class InformationModule {}
