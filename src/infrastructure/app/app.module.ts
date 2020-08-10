import { Module } from '@nestjs/common';
import { AppController } from '../../ui/http/rest/app/app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.local.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
