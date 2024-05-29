import { createHash } from 'crypto';
import { logger } from './classes/Logger';

function welcome(clearScreen = false) {
    if (clearScreen) logger().clearScreen();
    logger().logKeyValueScreen([{
            key: 'Check interval:',
            value: `${globalThis.checkInterval}ms (~${Math.round(globalThis.checkInterval / 1000)}s)`
        }, {
            key: 'Request interval:',
            value: `${globalThis.requestInterval}ms (~${Math.round(globalThis.requestInterval / 3600000)}h)`
        }, {
            key: 'Data file path:',
            value: globalThis.dataPath
        }, {
            key: 'Log file path:',
            value: globalThis.logPath
        }
    ]);
}

function stringify(obj: unknown, pretty = false): string {
    return JSON.stringify(obj, null, pretty ? '    ' : undefined);
}

function serialize(obj: unknown): string {
    const hash = createHash('md5');
    return hash.update(stringify(obj)).digest('hex');
}

function timestampToDate(timestamp: Nullable<number>): string {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return `${date.toLocaleString(undefined, { timeZoneName: 'shortOffset', hourCycle: 'h23' })}`;
}

export { serialize, stringify, timestampToDate, welcome };