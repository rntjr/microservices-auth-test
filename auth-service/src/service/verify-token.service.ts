import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerifyTokenService {
  constructor(private jwtService: JwtService) {}

  async execute(token: string): Promise<void> {
    try {
      await this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException('Invalid Token!');
    }
  }
}
