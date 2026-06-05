import type { ClickHouseClient } from '@clickhouse/client';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(@Inject('CLICKHOUSE_CLIENT') private readonly clickhouseClient: ClickHouseClient) {}
    getHello(): string {
        return 'Hello World!';
    }

    async getClickhouseInfo() {
        const res = await this.clickhouseClient.query({
            query: 'SELECT 1',
        });
        return res.json();
    }
}
