import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';

export type CreateUserDto = {
    username: string;
    password: string;
    email: string;
};

@UseGuards(AuthGuard('jwt')) // users controller 下的所有请求都需要验证token
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async listUsers() {
        return await this.usersService.listUsers();
    }
}
