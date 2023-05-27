import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  name: string;

  @Exclude()
  password: string;

  created_at: string;
  is_active: boolean;

  constructor() {
    this.id = randomUUID();
    this.is_active = true
    this.created_at = new Date().toISOString();
  }
}
