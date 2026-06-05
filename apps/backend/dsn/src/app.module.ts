import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClickhouseModule } from './fundamentals/clickhouse/clickhouse.module';
import { EmailModule } from './fundamentals/email/email.module';
import { SpanModule } from './modules/span/span.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
        }),
        ClickhouseModule.forRoot({
            url: process.env.CLICKHOUSE_URL!,
            username: process.env.CLICKHOUSE_USERNAME!,
            password: process.env.CLICKHOUSE_PASSWORD!,
        }),
        EmailModule.forRoot({
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: '',
                pass: '',
            },
        }),
        SpanModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
