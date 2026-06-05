// 全局模块
import { createClient } from '@clickhouse/client';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class ClickhouseModule {
    static forRoot(options: { url: string; username: string; password: string }): DynamicModule {
        return {
            module: ClickhouseModule,
            providers: [
                {
                    provide: 'CLICKHOUSE_CLIENT',
                    useFactory() {
                        // 单例，返回 clickhouse 客户端示例，用来后续操作 clickhouse
                        return createClient(options);
                    },
                },
            ],
            exports: ['CLICKHOUSE_CLIENT'],
        };
    }
}
