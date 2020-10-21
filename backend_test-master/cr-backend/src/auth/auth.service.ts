import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import Userinfo from 'src/User_info/Userinfo.entity';
import { UserinfoService } from 'src/User_info/Userinfo.service';
import * as bcripts from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private UserinfoService:UserinfoService,
        private jwtService : JwtService,
    ){}

    async signup(createUserDto: CreateUserDto){
        const {
            UserName,
            Password,
            FirstName,
            LastName,
            BirthDate,
            Gender,
            PhoneNO,
            Email,
        } = createUserDto;
        const exist = await this.UserinfoService.findUserByEmail(Email);
        if(exist){
            throw new BadRequestException('email already taken');
        }
        const user = new Userinfo();
        user.UserName = UserName;
        user.Password = await this.hashPassword(Password,user.salt)
        user.salt = await this.hashPassword(Password,user.salt)
        user.FirstName = FirstName;
        user.LastName = LastName;
        user.BirthDate = BirthDate;
        user.Gender = Gender;
        user.PhoneNO = PhoneNO;
        user.Email = Email;
        await this.UserinfoService.saveUser(user);
        return user;
    }

    async login(authUserDto: AuthUserDto,hashed: boolean = false){
        const user: Userinfo = await this.UserinfoService.findUserByUsername(
            authUserDto.UserName,
        );
        if (!user){
            throw new UnauthorizedException('user not found');
        }

        if(hashed === false){
            if(!await user.validatePassword(authUserDto.Password)){
                throw new UnauthorizedException('Authentication Failed');
            }
        }

        const payload = {
            UserName: user.UserName,
            FistName:user.FirstName,
            LastName:user.LastName,
            BirthDate:user.BirthDate,
            Gender:user.Gender,
            PhoneNO:user.PhoneNO,
            Email:user.Email,
        };
        const accessToken = await this.jwtService.sign(payload);
        const decode = this.jwtService.decode(accessToken);
        return {accessToken,data: decode};
    }

    private async hashPassword(password: string,salt: string): Promise<string>{
        return bcripts.hash(password,salt);
    }

    decodeToken(accessToken: string){
        return this.jwtService.decode(accessToken);
    }
}
