import {Entity,Column,ObjectIdColumn}  from 'typeorm';
import { ObjectID} from 'mongodb';

@Entity()
export class Petinfo{
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    PetName: string;

    @Column()
    PetBreed: string;

    @Column()
    PetGender: string;

    @Column()
    type: string;

    @Column()
    petPicUrl: string;

    @Column()
    regPetStatus: string;

    @Column()
    adopPetStatus: string;

    @Column()
    PetStatus: string;

    //@Column()
    //petSize: .....

    @Column()
    petLength: string;

    @Column()
    petHeight: string;

    //@Column()
    //petCerUrl: string;

    //@Column()
    //TimeStampUpdate: Date;

    @Column()
    UserId: ObjectID;

    @Column()
    AdopUserId: string;
}


export default Petinfo;