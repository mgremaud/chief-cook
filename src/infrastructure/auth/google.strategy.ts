import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";
import { RequestInterface } from '../../domain/auth/request.interface';
import DoneCallback = jest.DoneCallback;
import { ProfileInterface } from '../../domain/auth/profile.interface';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile']
    })
  }

  async validate(request: RequestInterface, accessToken: string, refreshToken: string, profile: ProfileInterface, done: DoneCallback): Promise<void> {
    try {
      const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
      const user = {
          jwt
        }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}