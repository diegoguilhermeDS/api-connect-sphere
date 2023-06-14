import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InformationRepository } from './repositories/information.repository';


@Injectable()
export class InformationService {
  constructor(private informationRepository: InformationRepository) {}

  async create(
    id: string,
    createInformationDto: CreateInformationDto,
    userId: string,
    typeUser: string
  ) {
    if (createInformationDto.email) {
      const findEmail = await this.informationRepository.findInforByEmail(
        createInformationDto.email,
      );
      if (findEmail) {
        throw new ConflictException('E-mail already exists');
      }
    }

    if (createInformationDto.phone) {
      const findPhone = await this.informationRepository.findInforByPhone(
        createInformationDto.phone,
      );
      if (findPhone) {
        throw new ConflictException('Phone already exists');
      }
    }

    if (typeUser == "client" && id !== userId) {
      throw new ForbiddenException('Insufficient permission');
    }

    const newInformation = await this.informationRepository.create(
      id,
      createInformationDto,
      typeUser
    );
    return newInformation;
  }

  async findOne(inforId: string) {
    const information = await this.informationRepository.findOne(inforId);
    if (!information) {
      throw new NotFoundException('Client not found');
    }
    return information;
  }

  async update(
    inforId: string,
    updateInformationDto: UpdateInformationDto,
    userId: string,
    typeUser: string
  ) {
    const information = await this.informationRepository.findOne(inforId);
    if (!information) {
      throw new NotFoundException('Informations not found');
    }

    if (updateInformationDto.email) {
      const findEmail = await this.informationRepository.findInforByEmail(
        updateInformationDto.email,
      );
      if (findEmail) {
        throw new ConflictException('E-mail already exists');
      }
    }

    if (updateInformationDto.phone) {
      const findPhone = await this.informationRepository.findInforByPhone(
        updateInformationDto.phone,
      );
      if (findPhone) {
        throw new ConflictException('Phone already exists');
      }
    }

    if (typeUser === "client" && information.clientId !== userId) {
      throw new ForbiddenException('Insufficient permission');
    }

    if(typeUser === "contact") {
      const clientIdByContact = await this.informationRepository.findContact(information.contactId)

      if(clientIdByContact !== userId) {
        throw new ForbiddenException('Insufficient permission');
      }
    }

    const informationUpdate = this.informationRepository.update(
      inforId,
      updateInformationDto,
    );

    return informationUpdate;
  }

  async remove(inforId: string, userId: string, typeUser: string) {
    const information = await this.informationRepository.findOne(inforId);
    if (!information) {
      throw new NotFoundException('Informations not found');
    }

    if (typeUser === "client" && information.clientId !== userId) {
      throw new ForbiddenException('Insufficient permission');
    }
    
    if(typeUser === "contact") {
      console.log(information)
      const clientIdByContact = await this.informationRepository.findContact(information.contactId)

      if(clientIdByContact !== userId) {
        throw new ForbiddenException('Insufficient permission');
      }
    }

    await this.informationRepository.delete(inforId);

    return;
  }
}
