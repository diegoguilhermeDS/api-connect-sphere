import { ApiProperty } from '@nestjs/swagger';

export class badRequestDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string[];
  @ApiProperty()
  error: string;
}
