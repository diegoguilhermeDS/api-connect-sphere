import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { contactsModule } from './modules/contacts/contacts.module';
import { InformationModule } from './modules/information/information.module';

@Module({
  imports: [ClientsModule, contactsModule, InformationModule],
})
export class AppModule {}
