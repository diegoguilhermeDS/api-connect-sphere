import { IsNotEmpty, IsString } from 'class-validator';

export class CreatecontactsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
