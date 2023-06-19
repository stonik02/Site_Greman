import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.SECRET_KEY
  })],
  providers: [TokenService, JwtService],
  controllers: [TokenController],
  exports: [TokenService]
})
export class TokenModule {}
