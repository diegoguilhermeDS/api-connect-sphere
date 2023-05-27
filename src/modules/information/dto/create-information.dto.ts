import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateInformationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 12)
  phone: string;
}
