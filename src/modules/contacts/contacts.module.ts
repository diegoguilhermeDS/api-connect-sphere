import { Module } from '@nestjs/common';
import { contactsService } from './contacts.service';
import { contactsController } from './contacts.controller';

@Module({
  controllers: [contactsController],
  providers: [contactsService],
})
export class contactsModule {}
