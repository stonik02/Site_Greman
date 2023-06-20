import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CompliteRefreshTokenDto, RefreshTokenDto } from './dto';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Post('refresh')
    refreshToken(@Body() dto: RefreshTokenDto):  Promise<CompliteRefreshTokenDto> {
        console.log('Refresh in controller: ', dto)
        return this.tokenService.refreshToken(dto.refresh)

    }
}
