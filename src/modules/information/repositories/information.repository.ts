import { CreateInformationDto } from "../dto/create-information.dto";
import { Information } from "../entities/information.entity";
import { UpdateInformationDto } from "../dto/update-information.dto";

export abstract class InformationRepository {
    abstract create(id: string, data: CreateInformationDto): Promise<Information> | Information
    abstract findInforByEmail(email: string): Promise<Information> | Information
    abstract findInforByPhone(phone: string): Promise<Information> | Information
    abstract findOne(inforId: string): Promise<Information> | Information
    abstract update(inforId: string, data: UpdateInformationDto): Promise<Information> | Information
    abstract delete(inforId: string): Promise<void> | void;
}