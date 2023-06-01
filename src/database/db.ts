import { Client } from 'src/modules/clients/entities/client.entity';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { Information } from 'src/modules/information/entities/information.entity';

export const clients: Client[] = [];
export const contacts: Contact[] = []
export const information: Information[] = []

export const clients_contacts: {
  id: string;
  client_id: string;
  contact_id: string;
}[] = [];
