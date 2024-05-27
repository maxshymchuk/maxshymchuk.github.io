import { Command } from 'commander';
import { join, resolve } from 'path';

const rootPath = resolve(join('..'));

const DEFAULT_DATA_PATH = resolve(`${rootPath}/client/public/data.json`);
const DEFAULT_LOG_PATH = resolve(`${rootPath}/service/log.txt`);
const DEFAULT_CHECK_INTERVAL = '10';
const DEFAULT_REQUEST_INTERVAL = '3600';

const program = new Command();

program
    .name('service')
    .helpOption(false)
    .option('-d, --data-path <string>', 'path to data.json', DEFAULT_DATA_PATH)
    .option('-l, --log-path <string>', 'path to log.txt', DEFAULT_LOG_PATH)
    .option('-r, --request-interval <number>', 'interval between requests to a server (s)', DEFAULT_REQUEST_INTERVAL)
    .option('-c, --check-interval <number>', 'interval to check if request time has come (s)', DEFAULT_CHECK_INTERVAL)
    .option('-y, --yes', 'pass this flag to start immediately');

function parseCLI() {
    program.parse();

    const { dataPath, logPath, checkInterval, requestInterval, yes } = program.opts();

    globalThis.dataPath = dataPath;
    globalThis.logPath = logPath;
    globalThis.checkInterval = +checkInterval * 1000;
    globalThis.requestInterval = +requestInterval * 1000;
    globalThis.autoStart = !!yes;

    program.outputHelp();
}

export { program, parseCLI };