import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async validateClient(clientEmail: string, clientPassword: string) {
    const client = await this.clientsService.findByEmailToAuth(clientEmail);
    if (client) {
      const passwordMatch = await compare(clientPassword, client.password);
      if (passwordMatch) {
        return { email: clientEmail };
      }
    }

    return null;
  }

  async login(email: string) {
    const client = await this.clientsService.findByEmailToAuth(email);
    return {
      token: this.jwtService.sign({ email }, { subject: client.id }),
    };
  }
}
