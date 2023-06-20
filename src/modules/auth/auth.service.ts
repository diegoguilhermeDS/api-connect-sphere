import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const infor = await this.clientsService.findByEmailToAuth(clientEmail);
    if (infor) {
      const passwordMatch = await compare(clientPassword, infor.client.password);
      if (passwordMatch) {
        return { email: clientEmail };
      }
    }

    return null;
  }

  async login(email: string) {
    const infor = await this.clientsService.findByEmailToAuth(email);

    if(infor.primary == false || infor.client.is_active == false) {
      throw new UnauthorizedException("Invalid credentials")
    }

    return {
      token: this.jwtService.sign({ email }, { subject: infor.client.id }),
    };
  }
}
