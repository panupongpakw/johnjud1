import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';

import Petinfo from './Pets_Info/PetInfo.entity';
import { PetinfoModule } from './Pets_Info/PetInfo.module';
import Userinfo from './User_info/Userinfo.entity';
import { UserinfoModule } from './User_info/Userinfo.module';
import { HomePageModule} from './Homepage/HomePage.module';
import { BookmarkModule } from './Bookmark/Bookmark.module';
import { Bookmark } from './Bookmark/Bookmark.entity';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { Conversation } from './chat/conversation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://worker:LpHNPZwDA4a36EH@cluster0.4yw9h.azure.mongodb.net/johnjudDB?retryWrites=true&w=majority',
      port: 27017,
      username: 'worker',
      password: 'LpHNPZwDA4a36EH',
      database: 'tan',
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      entities: [Petinfo,Userinfo,Bookmark,Conversation],
    }),
    
    PetinfoModule,UserinfoModule,HomePageModule,BookmarkModule, ChatModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*
my localhost

      type: 'mongodb',
      host: 'localhost',
      database: 'JJ',
      entities: [Petinfo, Userinfo],
      synchronize: true,

---------------------------------------------------------------------
Group database

      type: 'mongodb',
      url: 'mongodb+srv://worker:LpHNPZwDA4a36EH@cluster0.4yw9h.azure.mongodb.net/johnjudDB?retryWrites=true&w=majority',
      port: 27017,
      username: 'worker',
      password: 'LpHNPZwDA4a36EH',
      database: 'tan',
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      entities: [Petinfo,Userinfo],


*/