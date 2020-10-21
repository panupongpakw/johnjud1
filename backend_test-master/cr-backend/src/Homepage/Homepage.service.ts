import { Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectId} from 'mongodb';
import { CreatePetDto} from '../dto/create-petinfo.dto';

import Petinfo from 'src/Pets_Info/PetInfo.entity';


@Injectable()
export class HomePageService{
    constructor(
        @InjectRepository(Petinfo)
        private PetinfoRepository: Repository<Petinfo>
    ) {}

    async findAllPetRegisterTest(): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{regPetStatus:"register"}});
    }

    async findPetTypedog(): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{regPetStatus:"register",type:"Dog"}})
    }

    async findPetTypecat(): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{regPetStatus:"register",type:"Cat"}})
    }

    async findPetOther(): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{regPetStatus:"register",type:"others"}})
    }
}
