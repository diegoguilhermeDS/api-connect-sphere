import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  name: string;
  created_at: string;

  constructor(data?: Partial<Contact>) {
    this.id = randomUUID();
    this.created_at = new Date().toISOString();
    this.name = data?.name
  }
}
