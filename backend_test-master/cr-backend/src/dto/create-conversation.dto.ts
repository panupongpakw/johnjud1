import { IsNotEmpty } from "class-validator";

export class CreateConversationDto{
    
    @IsNotEmpty()
    senderId: number;

    @IsNotEmpty()
    receiverId: number;

    @IsNotEmpty()
    message: string;
}