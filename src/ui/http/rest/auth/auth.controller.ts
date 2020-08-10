import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestInterface } from '../../../../domain/auth/request.interface';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void
  {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: RequestInterface): string
  {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt)
      return jwt;
    else
      return null;
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(): string
  {
    return 'JWT is working!';
  }
}
