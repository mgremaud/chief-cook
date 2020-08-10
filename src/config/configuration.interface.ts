import { ConfigurationAuthInterface } from './configuration-auth.interface';

export interface ConfigurationInterface {
  port: number;
  auth: ConfigurationAuthInterface;
}