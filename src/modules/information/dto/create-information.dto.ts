import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateInformationDto {
  @ApiProperty({
    description: 'Information Email',
    type: String,
    default: "kenzinh_test@mail.com"
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Information Phone',
    type: String,
    default: "988552211"
  })
  @IsString()
  @Length(9, 12)
  @IsOptional()
  phone: string;
}
