import { createParamDecorator } from "@nestjs/common";
import Userinfo from "src/User_info/Userinfo.entity";

export const GetUser = createParamDecorator(
    (data,req): Userinfo =>{
        const user = req.arg[0].user;
        return user;
    }
)