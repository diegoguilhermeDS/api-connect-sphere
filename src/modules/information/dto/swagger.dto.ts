import {ApiProperty} from "@nestjs/swagger"

export class ResponseInformationSwaggerDto {
    @ApiProperty()
    id: String
    @ApiProperty()
    email: String
    @ApiProperty()
    phone: String
}