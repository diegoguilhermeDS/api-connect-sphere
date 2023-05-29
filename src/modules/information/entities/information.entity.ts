import { Exclude } from "class-transformer";
import { randomUUID } from "crypto";

export class Information {
  readonly id: string;
  
  email: string;
  phone: string;
  clientId: string;
  contactId: string;

  constructor() {
    this.id = randomUUID()
  }
}
