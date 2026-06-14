import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login({ username, password }: { username: string; password: string }) {
        const payload = { username, password };
        const user = await this.usersService.findUserByUsername(username);
        if (!user || user.password_hash !== password) {
            return null;
        }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register({ username, password, email }: { username: string; password: string; email: string }) {
        const user = await this.usersService.createUser({ username, password, email });
        return user;
    }

    getPublicKey() {
        return process.env.RSA_PUBLIC_KEY;
    }

    validateUser() {
        return {};
    }
}
