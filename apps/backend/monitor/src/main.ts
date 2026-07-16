import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.setGlobalPrefix('api');

    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') ?? [];

    app.enableCors({
        origin: (requestOrigin, callback) => {
            // 允许没有 origin 的请求（如 Postman、服务器间调用）
            if (!requestOrigin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(requestOrigin)) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${requestOrigin} not allowed by CORS`));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // 允许携带 cookie
        maxAge: 3600, // preflight 缓存时间（秒）
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
