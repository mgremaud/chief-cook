import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";


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

  async validate(request: any, accessToken: string, refreshToken: string, profile, done): Promise<void> {
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