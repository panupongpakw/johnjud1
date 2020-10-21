import { ObjectID} from 'mongodb';

export class CreateBookmarkDto{
    
    PetId: ObjectID;

    PetName: string;

    petPicUrl: string;

    UserId: ObjectID;
}