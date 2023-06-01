import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDTO } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { ResponseLoginSwaggerDto } from './dto/swagger.dto';
import { ErrorDto } from '../..//swagger/Error.dto';

@ApiTags('Login')

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @ApiOperation({ summary: 'Login with a client' })
  @ApiResponse({
    status: 201,
    description: 'Login with a client',
    type: ResponseLoginSwaggerDto
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email or password',
    type: ErrorDto
  })
  @UseGuards(LocalAuthGuard)
  async login(@Body() client: LoginDTO) {
    return this.authService.login(client.email)
  }
}
