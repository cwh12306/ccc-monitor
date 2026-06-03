import { init as buInit } from '@ccc-monitor/browser-utils';
import { Errors } from './integrations/errorsIntegration';

const errors = new Errors();

export function init() {
    console.log('启动成功');

    buInit();
    errors.init();

    // // 错误监控指标采集
    // window.addEventListener('error', event => {
    //     console.log('error', event)
    // })

    // // 对于异步数据指标采集
    // window.addEventListener('unhandledrejection', event => {
    //     console.log('unhandledrejection', event)
    // })

    // // 对于性能采集
    // new PerformanceObserver(list => {
    //     for (const entry of list.getEntries()) {
    //         console.log(entry)
    //     }
    // }).observe({ entryTypes: ['resource', 'longtask'] })
}
