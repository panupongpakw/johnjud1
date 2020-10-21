import { JwtSignOptions } from "@nestjs/jwt"

const signOptions: JwtSignOptions ={
    expiresIn: 3600,
}

export const jwtConstants ={
    secret: 'secret-jj',
    signOptions,
}