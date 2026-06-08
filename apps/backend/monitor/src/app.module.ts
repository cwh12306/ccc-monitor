import { join } from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './modules/application/application.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            entities: [join(__dirname, 'entities', '*{.ts,.js}')],
            synchronize: true, // 线上环境请关闭
        }),
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
