import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import Userinfo from "src/User_info/Userinfo.entity";
import { UserinfoService } from "src/User_info/Userinfo.service";
import { JwtPayload } from "./jwt-payload.interface";
import { jwtConstants } from "./jwt.config";

@Injectable()
export class JwtStragy extends PassportStrategy(Strategy){
    constructor(private UserinfoService: UserinfoService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    async validate(payload: JwtPayload){
        const user:Userinfo = await this.UserinfoService.findUserByUsername(
            payload.UserName,
        );
        if(!user){
            throw new UnauthorizedException('User not authenticated');
        }
        return  user;
    }
}