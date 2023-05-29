import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  name: string;

  @Exclude()
  password: string;

  is_active: boolean;
  created_at: string;

  constructor() {
    this.id = randomUUID();
    this.name = this.name
    this.is_active = true
    this.created_at = new Date().toISOString();
  }
}
