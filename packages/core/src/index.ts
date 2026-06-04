import { Transport } from './transport';
export type { Transport } from './transport';
export type { Integration } from './types';
import { MonitoringOptions } from './types';

// 通过插件体系设计并接入
// 初始化监控系统并接入对应的传输层协议
export let getTransport: () => Transport | null = () => null;

export class Monitoring {
    private transport: Transport | null = null; // 会在对应上报的宿主环境中进行赋值

    constructor(private options: MonitoringOptions) {
        getTransport = () => this.transport;
    }

    init(transport: Transport) {
        this.transport = transport; // 完成宿主的传输协议初始化
        getTransport = () => transport;

        this.options.integrations?.forEach(integration => {
            integration.init(transport);
        });
    }

    reportMessage(message: string) {
        this.transport?.send({
            type: 'message',
            message,
        });
    }

    reportEvent(event: unknown) {
        this.transport?.send({
            type: 'event',
            event,
        });
    }
}
