import { Injectable } from "@nestjs/common";
import { ContactRepository } from "../contacts.repository";
import { PrismaService } from "src/database/prisma.service";
import { CreateContactsDto } from "../../dto/create-contact.dto";
import { UpdateContactsDto } from "../../dto/update-contact.dto";
import { Contact } from "../../entities/contact.entity";
import { Information } from "src/modules/information/entities/information.entity";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ContactPrismaRepository implements ContactRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateContactsDto): Promise<Contact> {
        
        return 
      }
    
      async findAll(): Promise<Contact[]> {
       
        return 
      }
    
      async findOne(id: string): Promise<Contact> {
       
        return 
      }
    
      async findByEmail(email: string): Promise<Contact> {
    
        return null;
      }
    
      async findByPhone(phone: string): Promise<Contact> {
        
        return null;
      }
    
      async update(id: string, data: UpdateContactsDto): Promise<Contact> {

        return
      }
    
      async delete(id: string): Promise<void> {

      }
}