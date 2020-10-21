import { Controller, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/auth/jwt.config';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { Conversation } from './conversation.entity';
import { ConversationRepository } from './conversation.repository';
import { ConversationService } from './conversation.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([ConversationRepository]),
        JwtModule.register({
            secret:  jwtConstants.secret,
            signOptions: jwtConstants.signOptions,
        }),
        PassportModule.register({defaultStrategy:'jwt'}),
    ],
    controllers: [ChatController],
    providers:[ChatGateway,ConversationService],
    exports: [ChatGateway],

})
export class ChatModule{}
