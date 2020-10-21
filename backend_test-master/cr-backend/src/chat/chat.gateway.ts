import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketGateway, 
         WebSocketServer,  
         SubscribeMessage, 
         OnGatewayConnection, 
         OnGatewayDisconnect } from '@nestjs/websockets';
import { Userinfo } from '../User_info/Userinfo.entity';

import { Socket,Client,Server } from 'socket.io';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect  {
    logger = new Logger('ChatGateway');
    onlineUsers = new Set();
    user: any;

    @WebSocketServer()
    wss: Server;

    constructor(private jwtService: JwtService){}
    handleConnection(socket: Socket, ...args: any[]){
        const user = this.getUser(socket);
        if(!user){
            socket.disconnect();
            //this.logger.error('authentication failed');
        }
        else{
            this.onlineUsers.add(user.userId);
            this.dispatchUsersOnline();
        }
    }

    handleDisconnect(socket: Socket){
        const user:any = this.getUser(socket);
        this.onlineUsers.delete(user.userId);
        this.dispatchUsersOnline();
    }

    @SubscribeMessage('message')
    handleMessage(client: any,payload: any): string{
        return payload;
    }

    private dispatchUsersOnline(){
        this.wss.emit('users/online',Array.from(this.onlineUsers));
    }

    private getUser(socket:Socket){
        const token = socket.handshake.query.token;
        const user: any = this.jwtService.decode(token);
        return user;
    }
}