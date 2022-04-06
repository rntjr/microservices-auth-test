import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';

interface IUser {
  username: string;
  password: string;
}

const verifyUserForLoginUrl = `http://localhost:${3000}/user/verifyUserForLogin`;
const service_id = 'fa3270a2-c045-49f9-8d45-1989ccdf171f';

@Injectable()
export class AuthenticationService {
  private user_id: string;
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}
  async execute(user: IUser) {
    const { username, password } = user;

    await this.httpService
      .post(
        verifyUserForLoginUrl,
        { username, password },
        { headers: { service_id } },
      )
      .forEach((response) => {
        this.user_id = response.data.id;
      })
      .catch((err) => {
        throw new BadRequestException(err.response.data);
      });

    if (!this.user_id) throw new BadRequestException(`Erro`);

    const token = this.jwtService.sign({ user_id: this.user_id });

    return { token };
  }
}
