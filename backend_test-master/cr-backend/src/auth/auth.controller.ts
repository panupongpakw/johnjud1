import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ValidatePromise } from "class-validator";
import { AuthUserDto } from "src/dto/auth-user.dto";
import { CreateUserDto } from "src/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body(ValidationPipe) CreateUserDto: CreateUserDto){
        return this.authService.signup(CreateUserDto);
    }

    @Post('/login')
    async login(@Body(ValidationPipe) authUserDto: AuthUserDto){
        return this.authService.login(authUserDto);
    }
}