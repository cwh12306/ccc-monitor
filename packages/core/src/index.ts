// console.log(123);

export interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: 'cwh',
    age: 18,
};

// window.onload = () => {
//   console.log(person.name, person.age);
// }

console.log(person.name, person.age);

export function init() {
    // 错误监控指标采集
    window.addEventListener('error', event => {
        console.log('error', event);
    });

    // 对于异步数据指标采集
    window.addEventListener('unhandledrejection', event => {
        console.log('unhandledrejection', event);
    });

    // 对于性能采集
    new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
            console.log(entry);
        }
    }).observe({ entryTypes: ['resource', 'longtask'] });
}
