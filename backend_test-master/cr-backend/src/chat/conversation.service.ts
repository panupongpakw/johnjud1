import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateConversationDto } from "src/dto/create-conversation.dto";
import { FilterConversation } from "src/dto/filter-conversation.dto";
import { MarkAsReadConversationDto } from "src/dto/markAsRead.dto";
import Userinfo from "src/User_info/Userinfo.entity";
import { Repository } from "typeorm";
import { chatGatewayConst } from "./chat.config";
import { ChatGateway } from "./chat.gateway";
import { Conversation } from "./conversation.entity";
import { ConversationRepository } from "./conversation.repository";

@Injectable()
export class ConversationService{
    constructor(
    @InjectRepository(Conversation)
    private ConversationRepository: ConversationRepository,
    private ChatGateway: ChatGateway,
    ){}

    async getConversation(
        senderId: number,
        receiverId: number,
        filter: FilterConversation): Promise<Conversation[]>{
        return this.ConversationRepository.getConversation(senderId,receiverId,filter);
    }

    async saveConversation(CreateConversationDto: CreateConversationDto){
        const result: Conversation = await this.ConversationRepository.saveConversation(
            CreateConversationDto,
        );
        this.ChatGateway.wss.emit(
            chatGatewayConst.newMessageToUserChannel + result.receiverId,
            result,
        );
        return result;
    }

    async markAllBeforeAsRead(conversation: MarkAsReadConversationDto){
        return this.ConversationRepository.markAllBeforeAsRead(conversation);
    }

    // async deleteConversation(conversationId: number,user:Userinfo){
    //     return this.ConversationRepository.deleteConversation(conversationId,user);
    // }
}

