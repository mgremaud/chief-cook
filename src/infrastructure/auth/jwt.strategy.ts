import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import DoneCallback = jest.DoneCallback;
import { PayloadInterface } from '../../domain/auth/payload.interface';

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

  async validate(payload: PayloadInterface, done: DoneCallback): Promise<void>
  {
    try
    {
      //TODO:verify the claims of the token:
      // does the user still have the roles that are claimed by the token
      // const validClaims = await this.authService.verifyTokenClaims(payload);
      // if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);
      console.log(payload);
      done(null, payload);
    }
    catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}