import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(OmitType(CreateClientDto, ["email", "phone"])) {}
