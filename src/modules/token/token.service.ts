import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService,
        private readonly configService: ConfigService) {}

    async generateJWT(user, expiresIn) {
        const payLoad = { user }
        return this.jwtService.sign(payLoad, {
            secret: process.env.SECRET_KEY,
            expiresIn: '60d'
        })
        
    }

    async verifyJWT(token: string): Promise<any> {
        try {
          const decoded = this.jwtService.decode(token);
          console.log(decoded)
          return decoded;
        } catch (error) {
          // Обработка ошибок верификации токена
          throw new BadRequestException('Invalid token');
        }
      }

}
