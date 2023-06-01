import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { contactsModule } from './modules/contacts/contacts.module';
import { InformationModule } from './modules/information/information.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ClientsModule, contactsModule, InformationModule, AuthModule],
})
export class AppModule {}
