import { createHash } from 'crypto';
import { Logger, logger } from './classes/Logger.js';
import { Checker } from './classes/Checker.js';
import { createInterface } from 'node:readline/promises';

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

async function dialog(question: string, trueAnswers: Array<string>, falseAnswers: Array<string>): Promise<boolean> {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    let answer = -1;
    while (answer === -1) {
        const userAnswer = await rl.question(question);
        if (trueAnswers.includes(userAnswer)) answer = 1; // !!answer = true
        if (falseAnswers.includes(userAnswer)) answer = 0; // !!answer = false
    }
    rl.close();
    return !!answer;
}

export { dialog, serialize, stringify, welcome };