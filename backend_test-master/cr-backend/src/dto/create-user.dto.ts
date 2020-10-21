import {IsDate, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString} from 'class-validator'
export class CreateUserDto{
    
    @IsNotEmpty()
    UserName: string;
    
    @IsNotEmpty()
    Password: string;

    @IsNotEmpty()
    FirstName: string;

    @IsNotEmpty()
    LastName: string;

    //ProfilePicUrl: string;

    @IsDate()
    BirthDate: string;
    
    @IsNotEmpty()
    Gender: string;
    
    @IsNotEmpty()
    PhoneNO: string;
    
    @IsEmail()
    Email: string;
 
    // Location
 
    @IsInt()
    AvgPoint: number;
 
    Description: string;
  
    //@IsDate()
    //TimeUpdate: Date;
}