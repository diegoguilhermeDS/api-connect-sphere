import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateContactsDto {
  @ApiProperty({
    description: 'Contact Name',
    type: String,
    default: "kenzinha"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Contact email',
    type: String,
    default: "kenzinha.girl@mail.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contact phone',
    type: String,
    default: "988004242"
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
