import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { users } from '../mocks/user.mocks';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async verifyUserForLogin(createUserDto: CreateUserDto) {
    const selectedUser = users.find(
      (user) => user.username === createUserDto.username,
    );
    if (!selectedUser) throw new BadRequestException('User failed!');
    if (!(await bcrypt.compare(createUserDto.password, selectedUser.password)))
      throw new BadRequestException('Username or Password not valid!');
    return { id: selectedUser.id };
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return users;
  }

  findByUsername(username: string) {
    return users.find((user) => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
