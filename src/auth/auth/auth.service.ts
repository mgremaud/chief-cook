import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export enum Provider
{
  GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService
    /*private readonly usersService: UsersService*/) {

  };
  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string>
  {
    try
    {
      //TODO: add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);
      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider
      }

      const jwt: string = sign(payload, this.configService.get<string>('JWT_SECRET_KEY'), { expiresIn: 3600 });
      return jwt;
    }
    catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
