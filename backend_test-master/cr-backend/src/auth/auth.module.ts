import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserinfoModule } from 'src/User_info/Userinfo.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt.config';
import { JwtStragy } from './jwt.strategy';

@Module({
  imports:[
    UserinfoModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions,
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStragy],
  exports: [JwtStragy,PassportModule],
})

export class AuthModule {}
