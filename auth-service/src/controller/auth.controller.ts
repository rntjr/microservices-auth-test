import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from '../service/authentication.service';
import { VerifyTokenService } from '../service/verify-token.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthenticationService,
    private verifyTokenService: VerifyTokenService,
  ) {}

  @Post('/login')
  async login(@Body() login: any) {
    const { username, password } = login;
    if (!username || !password) throw new BadRequestException();

    return await this.authService.execute({ username, password });
  }

  @Post('/verifyToken')
  @HttpCode(200)
  async verifyToken(@Req() request: Request) {
    const token = request.headers.authorization.split(' ')[1];
    return await this.verifyTokenService.execute(token);
  }
}
