import { Contact } from "../entities/contact.entity";
import { CreateContactsDto } from "../dto/create-contact.dto";
import { UpdateContactsDto } from "../dto/update-contact.dto";

export abstract class ContactRepository {
    abstract create(data: CreateContactsDto): Promise<Contact> | Contact
    abstract findAll(): Promise<Contact[]> | Contact[];
    abstract findOne(id: string): Promise<Contact | undefined> | Contact | undefined;
    abstract findByEmail(email: string): Promise<Contact> | Contact
    abstract findByPhone(phone: string): Promise<Contact> | Contact
    abstract update(id: string, data: UpdateContactsDto): Promise<Contact> | Contact;
    abstract delete(id: string): Promise<void> | void; 
}