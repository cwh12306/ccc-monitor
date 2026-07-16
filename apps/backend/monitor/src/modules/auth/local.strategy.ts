import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate() {
        const user = await this.authService.validateUser();
        if (!user) {
            throw new HttpException(
                {
                    message: 'authorization failed',
                    error: 'please try again later',
                },
                HttpStatus.UNAUTHORIZED
            );
        }
        return user;
    }
}
