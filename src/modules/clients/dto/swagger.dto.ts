import { ApiProperty } from '@nestjs/swagger';
import { ResponseInformationSwaggerDto } from '../../information/dto/swagger.dto';

export class ResponseClientSwaggerDto {
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
