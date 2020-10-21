import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { Double, ObjectId, ObjectID} from 'mongodb';
import { Exclude } from 'class-transformer';
import * as bcripts from 'bcrypt';

@Entity()
export class Userinfo{
    @ObjectIdColumn()
    id?: number;

    @Column()
    UserName: string;

    @Column()
    @Exclude()
    Password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    //@Column()
    //ProfilePicUrl: string;
    
    @Column()
    BirthDate: string;

    @Column()
    Gender: string;

    @Column()
    PhoneNO: string;

    @Column()
    Email: string;

    // @Column()
    // Location: string;

    @Column("Double")
    AvgPoint: number;

    @Column()
    Description: string;

    //@Column()
    //TimeUpdate: Date;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcripts.hash(password,this.salt);
        return hash === this.Password;
    }

    constructor(partial?: Partial<Userinfo>){
        Object.assign(this, partial);
    }
}

export default Userinfo;