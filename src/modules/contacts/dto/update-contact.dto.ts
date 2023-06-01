import { PartialType } from '@nestjs/swagger';
import { CreateContactsDto } from './create-contact.dto';


export class UpdateContactsDto extends PartialType(CreateContactsDto) {}
