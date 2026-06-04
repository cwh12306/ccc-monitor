import { Metrics } from '@ccc-monitor/browser-utils';
import { type Integration, Monitoring } from '@ccc-monitor/core';

import { Errors } from './integrations/errorsIntegration';
import { BrowserTransport } from './transport';
export function init(options: { dsn: string; integrations?: Integration[] }) {
    const monitoring = new Monitoring(options); // 创建监控实例

    const transport = new BrowserTransport(options.dsn); // 创建传输层实例（browser环境）

    monitoring.init(transport); // 开启监控

    new Errors(transport).init(); // 开启异常指标采集
    new Metrics(transport).init(); // 开启性能指标采集

    return monitoring;
}
