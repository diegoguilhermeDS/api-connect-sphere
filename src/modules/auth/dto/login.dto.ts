import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class LoginDTO {
  @ApiProperty({
    description: 'Client Email',
    type: String,
    default: "kenzinho@mail.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    description: 'Client Password',
    type: String,
    default: "kenzinho123"
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}