import { Exclude } from "class-transformer";
import { randomUUID } from "crypto";

export class Information {
  readonly id: string;
  
  email: string;
  phone: string;
  primary: boolean;
  clientId: string;
  contactId: string;

  constructor(data?: Partial<Information>) {
    this.id = randomUUID()
    this.email = data?.email
    this.phone = data?.phone
    this.primary = false
    this.clientId = data?.clientId
    this.contactId = data?.contactId
  }
}
