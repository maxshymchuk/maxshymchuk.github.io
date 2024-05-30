import { createHash } from 'crypto';
import { Logger, logger } from './classes/Logger';
import { Checker } from './classes/Checker';

function welcome(clearScreen = false) {
    if (clearScreen) logger().clearScreen();
    logger().logKeyValueScreen([{
            key: 'Request interval:',
            value: `${Checker.requestInterval}ms (~${(Checker.requestInterval / 3600000).toFixed(2)}h)`
        }, {
            key: 'Data file path:',
            value: Checker.path
        }, {
            key: 'Log file path:',
            value: Logger.path
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

export { serialize, stringify, welcome };