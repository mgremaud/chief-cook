import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{
  constructor()
  {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  }

  async validate(payload, done): Promise<void>
  {
    try
    {
      //TODO:verify the claims of the token:
      // does the user still have the roles that are claimed by the token
      // const validClaims = await this.authService.verifyTokenClaims(payload);
      // if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);

      done(null, payload);
    }
    catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }

}