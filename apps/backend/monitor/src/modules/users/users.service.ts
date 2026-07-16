import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '@/entities/Users';

import { CreateUserDto } from './users.controller';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {}

    async listUsers() {
        // 联合查询
        return await this.userRepository.find({});
    }

    async createUser(userData: CreateUserDto) {
        const { username, password, email } = userData;
        const user = new Users();
        user.username = username;
        user.password_hash = password;
        user.email = email;

        const res1 = await this.userRepository.save(user);
        return res1 ? 'success' : 'fail';
    }

    async findUserByUsername(username: string) {
        return await this.userRepository.findOne({ where: { username } });
    }
}
