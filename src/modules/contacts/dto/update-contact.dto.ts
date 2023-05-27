import { PartialType } from '@nestjs/mapped-types';
import { CreatecontactsDto } from './create-contact.dto';


export class UpdatecontactsDto extends PartialType(CreatecontactsDto) {}
