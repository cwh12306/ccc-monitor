import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('publicKey')
    getPublicKey() {
        return {
            data: this.authService.getPublicKey(),
            success: true,
            msg: '公钥获取成功',
        };
    }

    // @UsePipes(new PasswordTransformPipe())
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        if (!body.username || !body.password) {
            return {
                data: null,
                success: false,
                msg: '参数不全',
            };
        }
        const assessToken = await this.authService.login(body);
        if (assessToken)
            return {
                data: assessToken,
                success: true,
                msg: '登录成功',
            };
        return {
            data: null,
            success: false,
            msg: '登录失败',
        };
    }

    // @UsePipes(new PasswordTransformPipe())
    @Post('register')
    async register(@Body() body: { username: string; password: string; email: string }) {
        if (!body.username || !body.password || !body.email) {
            return {
                data: null,
                success: false,
                msg: '参数不全',
            };
        }
        const user = await this.authService.register(body);
        if (user)
            return {
                data: user,
                success: true,
                msg: '注册成功',
            };
        return {
            data: null,
            success: false,
            msg: '注册失败',
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile() {
        return 'profile';
    }
}
