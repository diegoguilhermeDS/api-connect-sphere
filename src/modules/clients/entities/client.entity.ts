import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  name: string;

  @Exclude()
  password: string;

  is_active: boolean;
  created_at: string;

  constructor(data?: Partial<Client>) {
    this.id = randomUUID();
    this.is_active = true
    this.created_at = new Date().toISOString();
    this.password = data?.password
    this.name = data?.name
  }
}
