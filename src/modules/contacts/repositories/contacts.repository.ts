import { Contact } from "../entities/contact.entity";
import { CreateContactsDto } from "../dto/create-contact.dto";
import { UpdateContactsDto } from "../dto/update-contact.dto";
import { Information } from "src/modules/information/entities/information.entity";

export abstract class ContactRepository {
    abstract create(data: CreateContactsDto, clientId: string): Promise<Contact> | Contact
    abstract findAll(clientId: string): Promise<Contact[]> | Contact[];
    abstract findOne(id: string, clientId: string): Promise<Contact | undefined> | Contact | undefined;
    abstract findByEmail(email: string): Promise<Information> | Information
    abstract findByEmailToAuth(email: string): Promise<Contact> | Contact
    abstract findByPhone(phone: string): Promise<Information> | Information
    abstract update(id: string, data: UpdateContactsDto): Promise<Contact> | Contact;
    abstract delete(id: string): Promise<void> | void; 
}