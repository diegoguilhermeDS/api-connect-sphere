import { ApiProperty } from '@nestjs/swagger';
import { ResponseInformationSwaggerDto } from '../../information/dto/swagger.dto';

export class ResponseContactSwaggerDto {
  @ApiProperty()
  id: String;
  @ApiProperty()
  name: String;
  @ApiProperty()
  is_active: Boolean;
  @ApiProperty()
  created_at: String;
  @ApiProperty()
  information: ResponseInformationSwaggerDto;
}
