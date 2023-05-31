import { CreateInformationDto } from "../dto/create-information.dto";
import { Information } from "../entities/information.entity";
import { UpdateInformationDto } from "../dto/update-information.dto";
import { Contact } from "src/modules/contacts/entities/contact.entity";

export abstract class InformationRepository {
    abstract create(id: string, data: CreateInformationDto, typeUser: string): Promise<Information> | Information
    abstract findInforByEmail(email: string): Promise<Information> | Information
    abstract findInforByPhone(phone: string): Promise<Information> | Information
    abstract findOne(inforId: string): Promise<Information> | Information
    abstract findContact(contactId: string): Promise<String> | String
    abstract update(inforId: string, data: UpdateInformationDto): Promise<Information> | Information
    abstract delete(inforId: string): Promise<void> | void;
}