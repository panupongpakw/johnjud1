import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Conversation{
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    content: string;

    @Column()
    senderId: number;

    @Column()
    receiverId: number;

    @Column({
        type: 'varchar',
        default: new Date().toISOString(),
    })
    createdAt: string;

    @Column({
        type: 'varchar',
        default: null,
    })
    readAt: string;
}