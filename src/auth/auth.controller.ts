import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void
  {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res): void
  {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect(this.configService.get<string>('LOGIN_SUCCESS_REDIRECTION') + jwt);
    else
      res.redirect(this.configService.get<string>('LOGIN_FAILURE_REDIRECTION'));
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(): string
  {
    return 'JWT is working!';
  }
}
