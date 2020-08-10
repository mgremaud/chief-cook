import { ConfigurationInterface } from './configuration.interface';

export default (): ConfigurationInterface => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  auth: {
    clientID    : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL : process.env.CALLBACK_URL,
  }
});