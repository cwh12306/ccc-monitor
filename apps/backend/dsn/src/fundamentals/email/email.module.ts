// 全局模块
import { DynamicModule, Global, Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Global()
@Module({})
export class EmailModule {
    static forRoot(options: { host: string; port: number; secure: boolean; auth: { user: string; pass: string } }): DynamicModule {
        return {
            module: EmailModule,
            providers: [
                {
                    provide: 'EMAIL_CLIENT',
                    useFactory() {
                        // 单例，返回 email 客户端示例，用来后续操作 email
                        return createTransport(options);
                    },
                },
            ],
            exports: ['EMAIL_CLIENT'],
        };
    }
}
