import { CreateInformationDto } from "../dto/create-information.dto";
import { Information } from "../entities/information.entity";

export abstract class InformationRepository {
    abstract create(data: CreateInformationDto): Promise<Information> | Information
}