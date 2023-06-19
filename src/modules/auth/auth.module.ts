import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
// import { UsersService } from '../users/users.service';
import { JWTStrategy } from 'src/strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TokenModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
