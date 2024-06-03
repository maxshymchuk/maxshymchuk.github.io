import { Command } from 'commander';
import { Checker } from '../../classes/Checker';
import { logger, Logger } from '../../classes/Logger';
import { Constants } from '../../constants';
import { getValidOpts } from './validation';
import { Options } from './types';
import { welcome } from '../../utils';

const program = new Command();

program
    .name('service')
    .helpOption(false)
    .option('-d, --data-path <string>', 'path to data file', Checker.path)
    .option('-l, --log-path <string>', 'path to log file', Logger.path)
    .option('-r, --request-interval <number>', 'interval between requests to a server (s)', `${Constants.defaultRequestIntervalMs}`)
    .option('-y, --yes', 'pass this flag to start immediately');

async function parseOptions(): Promise<Options> {
    program.parse();
    return getValidOpts(program.opts());
}

function showHelp() {
    program.outputHelp();
    logger().newLine({ toFile: false });
    welcome();
    logger().newLine({ toFile: false });
}

export { parseOptions, showHelp };