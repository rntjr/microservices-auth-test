import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './controller/auth.controller';
import { AuthenticationService } from './service/authentication.service';
import { HttpModule } from '@nestjs/axios';
import { VerifyTokenService } from './service/verify-token.service';

const secretJWT =
  process.env.SERVER_JWT_SECRET || 'a4109be8-8484-438e-a3f6-489addbe67e0';

@Module({
  controllers: [AppController],
  providers: [AuthenticationService, VerifyTokenService],
  imports: [
    HttpModule,
    JwtModule.register({
      secret: secretJWT,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AppModule {}
