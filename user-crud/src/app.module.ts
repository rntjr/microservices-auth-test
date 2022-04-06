import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';

@Module({
  imports: [UsersModule, HttpModule],
  providers: [],
})
export class AppModule {}
