import {Body, Controller ,Delete,Get, Param, Patch, Post} from '@nestjs/common';
import {ObjectId, ObjectID} from 'mongodb'
import Userinfo from './Userinfo.entity';
import { UserinfoService } from './Userinfo.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreatePetDto } from '../dto/create-petinfo.dto';
import {ParseObjectIdPipe} from '../common/pipe';
import Petinfo from 'src/Pets_Info/PetInfo.entity';
import { UpdateUserDto } from 'src/dto/update-userinfo.dto';

@Controller('userinfo')
export class UserinfoController{
    constructor(private UserinfoService: UserinfoService ){}

    @Get()
    async findAll(): Promise<Userinfo[]>{
        return this.UserinfoService.findAll();
    }
    
    @Get(':UserId/petregister')
    async findAllPetRegister(@Param('UserId') UserId: ObjectId): Promise<Petinfo[]>{
        return this.UserinfoService.findAllPetRegister(UserId);
    }

    @Get(':UserId/petdonation')
    async findAllPetDonation(@Param('UserId') UserId: ObjectId): Promise<Petinfo[]>{
        return this.UserinfoService.findAllPetDonation(UserId);
    }

    @Get(':UserId/petadoption')
    async findAllPetAdoption(@Param('UserId') UserId: ObjectId): Promise<Petinfo[]>{
        return this.UserinfoService.findAllPetAdoption(UserId);
    }

    @Get('/:UserId')
    async findUserId(@Param('UserId', ParseObjectIdPipe) UserId: ObjectId): Promise<Userinfo>{
        return this.UserinfoService.findUserId(UserId);
    }

    @Get('/:UserId/setting')
    async findUserIdSetting(@Param('UserId',ParseObjectIdPipe) UserId: ObjectId): Promise<Userinfo>{
        return this.UserinfoService.findUserId(UserId);
    }

    @Delete(':UserId/setting/delete')
    deleteUserId(@Param('UserId') UserId: string): Promise<void>{
        return this.UserinfoService.deleteUserId(UserId);
    }

    // @Patch('/:UserId/setting')
    // async UpdateUserSetting(@Param('UserId')UserId: ObjectID,
    //                         @Body() UpdateUserDto: UpdateUserDto){
    //     return this.UserinfoService.UpdateUserSetting(UpdateUserDto);
    // }

    @Patch('UserId/setting/phone')
    async UpdateUserPhone(@Param('UserId') UserId: ObjectID,
                          @Body('PhoneNO') PhoneNO: string): Promise<Userinfo>{
        return this.UserinfoService.UpdateUserPhoneNO(UserId,PhoneNO);
    }

    @Patch('UserId/setting/email')
    async UpdateUserEmail(@Param('UserId') UserId: ObjectID,
                          @Body('Email') Email: string): Promise<Userinfo>{
        return this.UserinfoService.UpdateUserEmail(UserId,Email);
    }

    @Post(':UserId/createpet')
    async createPet(@Param('UserId') UserId: ObjectID,
                    @Body() CreatePetDto: CreatePetDto){
        CreatePetDto.UserId = UserId;
        CreatePetDto.AdopUserId = "";
        CreatePetDto.regPetStatus = "register";
        CreatePetDto.adopPetStatus = "";
        CreatePetDto.PetStatus = "available";

        return this.UserinfoService.createPet(CreatePetDto)
    }    
}