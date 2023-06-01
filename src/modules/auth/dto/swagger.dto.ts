import { ApiProperty } from '@nestjs/swagger';


export class ResponseLoginSwaggerDto {
  @ApiProperty()
  token: String;
}
