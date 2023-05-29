import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateInformationDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @Length(9, 12)
  @IsOptional()
  phone: string;
}
