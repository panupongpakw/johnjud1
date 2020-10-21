import {Body, Controller ,Get, Param, Post} from '@nestjs/common';
import { HomePageService} from './Homepage.service';
import { ObjectID } from 'mongodb';
import { CreatePetDto } from 'src/dto/create-petinfo.dto';
import Petinfo from 'src/Pets_Info/PetInfo.entity';

@Controller()
export class HomePageController{
    constructor(private HomePageService: HomePageService){}

    @Get()
    async findAllPetRegisterTest(): Promise<Petinfo[]>{
        return this.HomePageService.findAllPetRegisterTest();
    }

    @Get('filter/typedog')
    async findPetTypedog(): Promise<Petinfo[]>{
        return this.HomePageService.findPetTypedog();
    }

    @Get('filter/typecat')
    async findPetTypecat(): Promise<Petinfo[]>{
        return this.HomePageService.findPetTypecat();
    }

    @Get('filter/other')
    async findPetOther(): Promise<Petinfo[]>{
        return this.HomePageService.findPetOther();
    }

    //@Get('filter/nearbyme')
}
