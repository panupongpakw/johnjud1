import { Injectable} from '@nestjs/common';
import {DeleteResult, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { ObjectID, ObjectId } from 'mongodb';
import {Userinfo} from './Userinfo.entity';
import Petinfo from '../Pets_Info/PetInfo.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreatePetDto } from 'src/dto/create-petinfo.dto'; 
import { UpdateUserDto} from '../dto/update-userinfo.dto'
import { UserinfoModule } from './Userinfo.module';

@Injectable()
export class UserinfoService{
    constructor(
        @InjectRepository(Userinfo)
        private UserinfoRepository: Repository<Userinfo>,
        @InjectRepository(Petinfo)
        private PetinfoRepository: Repository<Petinfo>,
    ) {}

    async findAll(): Promise<Userinfo[]>{
        return this.UserinfoRepository.find();
    }

    async findUserId(UserId:ObjectId): Promise<Userinfo>{
        return this.UserinfoRepository.findOne({where:{_id:UserId}});
    }

    async findUserByUsername(UserName:string): Promise<Userinfo>{
        return this.UserinfoRepository.findOne({where:{UserName:UserName}});
    }

    async findUserByEmail(Email:string):Promise<Userinfo>{
        return this.UserinfoRepository.findOne({where:{Email:Email}});
    }


    async findUserIdSetting(UserId:ObjectId): Promise<Userinfo[]>{
        return this.UserinfoRepository.find({where:{_id:UserId}});
    }

    async saveUser(user:Userinfo){
        return this.UserinfoRepository.save(user);
    }

    // async UpdateUserSetting(UpdateUserDto:UpdateUserDto){
    //     return this.UserinfoRepository.save(UpdateUserDto);
    // }

    // async updatePetStatus(petid: number, PetStatus: string): Promise<petinfo> {
    //     const petinfo = await this.getPetById(petid);
    //     petinfo.PetStatus = PetStatus;
    //     await this.petInfoRepository.save(petinfo);
    
    //     return petinfo;
    //   }

    async UpdateUserPhoneNO(UserId:ObjectID, PhoneNO: string): Promise<Userinfo>{
        const userinfo = await this.findUserId(UserId)
        userinfo.PhoneNO = PhoneNO;
        await this.UserinfoRepository.save(userinfo);

        return userinfo;
    }

    async UpdateUserEmail(UserId: ObjectID,Email: string): Promise<Userinfo>{
        const userinfo = await this.findUserId(UserId)
        userinfo.Email = Email;
        await this.UserinfoRepository.save(userinfo);

        return userinfo;
    }

    async findAllPetRegister(UserId:ObjectId): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{UserId:UserId, regPetStatus:"register"}});
    }

    async findAllPetAdoption(UserId:ObjectId): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{ AdopUserId: UserId ,adopPetStatus:"adoption"}});
    }

    async findAllPetDonation(UserId:ObjectId): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{ UserId: UserId , regPetStatus:"donation"}});
    }

    async createPet(CreatePetDto: CreatePetDto){
        return this.PetinfoRepository.save(CreatePetDto);
    }

    async deleteUserId(id:string): Promise<void>{
        await this.UserinfoRepository.delete(id);
    }
}