import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ContactRepository } from './repositories/contacts.repository';
import { InformationModule } from '../information/information.module';
import { ContactPrismaRepository } from './repositories/prisma/contacts.prisma.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    { provide: ContactRepository, useClass: ContactPrismaRepository },
  ],
  imports: [InformationModule]
})
export class contactsModule {}
