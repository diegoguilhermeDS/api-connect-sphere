import { PartialType } from '@nestjs/mapped-types';
import { CreateContactsDto } from './create-contact.dto';


export class UpdateContactsDto extends PartialType(CreateContactsDto) {}
