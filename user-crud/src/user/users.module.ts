import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controllers/users.controller';
import { AuthorizationMicroservice } from '../middleware/authorization-microservice.service';
import { AuthorizationService } from '../middleware/authorization.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [HttpModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMicroservice).forRoutes({
      path: 'user/verifyUserForLogin',
      method: RequestMethod.POST,
    });
    consumer.apply(AuthorizationService).forRoutes({
      path: 'user',
      method: RequestMethod.ALL,
    });
  }
}
