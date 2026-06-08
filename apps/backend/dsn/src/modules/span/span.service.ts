import type { ClickHouseClient } from '@clickhouse/client';
import { Inject, Injectable } from '@nestjs/common';

import { EmailService } from '../email/email.service';

@Injectable()
export class SpanService {
    constructor(
        @Inject('CLICKHOUSE_CLIENT') private readonly clickhouseClient: ClickHouseClient,
        private readonly emailService: EmailService
    ) {}

    async tracking(app_id, params: { event_type: string; message?: string }) {
        const { event_type, message, ...rest } = params;

        const values = {
            app_id,
            event_type,
            message,
            info: rest,
        };

        // 发送错误邮件
        // if (event_type === 'error') {
        //     await this.emailService.alert({
        //         to: 'devmiaomaedu@163.com',
        //         subject: '错误事件',
        //         params: {
        //             ...params,
        //             ...values,
        //         },
        //     });
        // }

        // 写入数据到clickhouse
        await this.clickhouseClient.insert({
            table: 'monitor.base_monitor_storage',
            values,
            columns: ['app_id', 'event_type', 'message', 'info'],
            format: 'JSONEachRow',
        });
    }
}
