import {Body, Controller ,Delete,Get, Param, Post} from '@nestjs/common';
import { BookmarkService} from './Bookmark.service';
import { ObjectId, ObjectID } from 'mongodb';
import Petinfo from 'src/Pets_Info/PetInfo.entity';
import { Bookmark } from './Bookmark.entity';
import { ParseObjectIdPipe } from 'src/common/pipe';
import { CreateBookmarkDto } from 'src/dto/create-bookmark.dto';
import { PetinfoService } from 'src/Pets_Info/PetInfo.service';
import { GetPet } from 'src/Pets_Info/get-pet.decorator';

@Controller('bookmark')
export class BookmarkController{
    constructor(private BookmarkService: BookmarkService,
                private PetinfoService: PetinfoService){}

    @Get()
    async findAll(): Promise<Bookmark[]>{
        return this.BookmarkService.findAll()
    }

    @Get(':UserId')
    async findBookmark(@Param('UserId') UserId: ObjectID): Promise<Bookmark[]>{
        return this.BookmarkService.findBookmark(UserId);
    }

    // @Get(':PetId/petinfo')
    // async findPetInfoBookmark(@Param('PetId', ParseObjectIdPipe) PetId: ObjectID): Promise<Petinfo[]>{
    //     return this.BookmarkService.findPetinfoBookmark(PetId);
    // }
    
    @Post(':UserId/PetId/addfav')
    async createBookmark(@Param('UserId') UserId: ObjectID,
                         @Param('PetId') PetId: ObjectID,
                         @Body() CreateBookmarkDto: CreateBookmarkDto){
            const PetInfo:Petinfo = await this.BookmarkService.findPetinfoBookmark(PetId);
            CreateBookmarkDto.petPicUrl = PetInfo.petPicUrl;
            CreateBookmarkDto.PetName = PetInfo.PetName;
            CreateBookmarkDto.PetId = PetId;
            CreateBookmarkDto.UserId = UserId;

            return this.BookmarkService.createBookmark(CreateBookmarkDto)
    };

    // @Get(':PetId/getpet')
    // async testfindpet(@Param('PetId' ,ParseObjectIdPipe)PetId: ObjectID): Promise<Petinfo>{
    //     return this.BookmarkService.findPetinfoBookmark(PetId);
    // }

    // @Delete()
    // async deleteBookmark()
    //const user = await this.UserinfoRepository.findOne({clientId:client.id});

    // @Get('/:petid')
    // async findPet(@Param('petid',ParseObjectIdPipe) petid: ObjectId): Promise<Petinfo[]>{
    //     return this.PetinfoService.findPet(petid);
    // }
}