import { Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import Petinfo from 'src/Pets_Info/PetInfo.entity';
import { PetinfoModule } from 'src/Pets_Info/PetInfo.module';
import { PetinfoService } from 'src/Pets_Info/PetInfo.service';
import { BookmarkController } from './Bookmark.controller';
import { Bookmark } from './Bookmark.entity';
import { BookmarkService } from './Bookmark.service';


@Module({
    imports: [TypeOrmModule.forFeature([Petinfo,Bookmark]),
        PetinfoModule
    ],

    controllers: [BookmarkController],
    providers: [BookmarkService,PetinfoService],
})

export class BookmarkModule {}