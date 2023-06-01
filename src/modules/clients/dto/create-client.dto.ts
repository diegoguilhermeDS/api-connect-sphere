import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Client Name',
    type: String,
    default: "kenzinho"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Client Email',
    type: String,
    default: "kenzinho@mail.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Client Phone',
    type: String,
    default: "988005454"
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Client Password',
    type: String,
    default: "kenzinho123"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
