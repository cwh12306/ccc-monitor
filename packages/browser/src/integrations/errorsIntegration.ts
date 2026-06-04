import type { Transport } from '@ccc-monitor/core';

export interface OnUnhandledRejectionErrorPayload {
    type: string;
    stack: string;
    message: string;
    path: string;
}

/**
 * 错误处理
 */
export class Errors {
    constructor(private transport: Transport) {}

    init() {
        window.onerror = (message, source, lineno, colno, error) => {
            console.log('🚀 ~ Errors ~ init ~ message, source:', message, source);
            console.log('🚀 ~ Errors ~ init ~ lineno, colno:', {
                event_type: 'error',
                type: error?.name,
                stack: error?.stack,
                message,
                path: window.location.pathname,
            });
            this.transport.send({
                event_type: 'error',
                type: error?.name,
                stack: error?.stack,
                message,
                path: window.location.pathname,
            });
        };

        window.onunhandledrejection = event => {
            console.log('🚀 ~ Errors ~ init ~ event:', event);
            console.log('🚀 ~ Errors ~ init ~ event.reason:', event.reason);
            console.log('🚀 ~ Errors ~ init ~ event:', event);
            console.log('🚀 ~ Errors ~ init ~ event.reason:', event.reason);

            this.transport.send({
                event_type: 'error',
                type: 'unhandledrejection',
                stack: event.reason.stack,
                message: event.reason.message,
                path: window.location.pathname,
            });
        };
    }
}
