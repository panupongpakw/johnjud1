import { IsNotEmpty } from "class-validator";

export class AuthUserDto{
    @IsNotEmpty()
    UserName: string;

    @IsNotEmpty()
    Password: string;
}