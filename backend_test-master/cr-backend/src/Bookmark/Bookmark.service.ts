import { Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ObjectID, ObjectId} from 'mongodb';

import Petinfo from 'src/Pets_Info/PetInfo.entity';
import { Bookmark } from './Bookmark.entity';
import { CreateBookmarkDto } from 'src/dto/create-bookmark.dto';


@Injectable()
export class BookmarkService{
    constructor(
        @InjectRepository(Petinfo)
        private PetinfoRepository: Repository<Petinfo>,
        @InjectRepository(Bookmark)
        private BookmarkRepository: Repository<Bookmark>
    ) {}

    async findAll(): Promise<Bookmark[]>{
        return this.BookmarkRepository.find();
    }

    async findBookmark(UserId:ObjectID){
        return this.BookmarkRepository.find({where:{UserId:UserId}});
    }

    async createBookmark(CreateBookmarkDto: CreateBookmarkDto){
        return this.BookmarkRepository.save(CreateBookmarkDto);
    }

    async findPetinfoBookmark(PetId: ObjectID): Promise<Petinfo>{
        return this.PetinfoRepository.findOne({where:{ _id:PetId }});
    }
}

/*
async createPet(CreatePetDto: CreatePetDto){
        return this.PetinfoRepository.save(CreatePetDto);
    }

async findAllPetRegister(UserId:ObjectId): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{UserId:UserId, petStatus:"register"}});
    }

async findPet(petid: ObjectId): Promise<Petinfo[]>{
        return this.PetinfoRepository.find({where:{ _id: petid }});
    }
*/