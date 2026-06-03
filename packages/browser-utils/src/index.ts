import { Metrics } from './integrations/metrics';

const metrics = new Metrics();

export function init() {
    metrics.init();
}
