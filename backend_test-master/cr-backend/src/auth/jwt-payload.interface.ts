export class JwtPayload{

    UserName: string;

    UserId: number;

    FirstName: string;

    LastName: string;

    //ProfilePicUrl: string;
    
    BirthDate: string;

    Gender: string;

    PhoneNO: string;

    Email: string;

    // Location: string;

    AvgPoint: number;

    Description: string;

    //TimeUpdate: Date;

    iat: number;
    //token issue date

    exp: number;
    //token exp date
}

export class JwtPayloadReponse{
    access_token: string;

    data: JwtPayload;
}