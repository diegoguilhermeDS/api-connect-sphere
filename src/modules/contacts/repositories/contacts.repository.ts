import { CreateClientDto } from "src/modules/clients/dto/create-client.dto";
import { Contact } from "../entities/contact.entity";

export abstract class ContactRepository {
    abstract create(data: CreateClientDto): Promise<Contact> | Contact
}