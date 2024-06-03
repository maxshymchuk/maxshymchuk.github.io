import { Command } from 'commander';
import { Checker } from '../../classes/Checker.js';
import { logger, Logger } from '../../classes/Logger.js';
import { Constants } from '../../constants.js';
import { getValidOpts } from './validation.js';
import { Options } from './types.js';
import { welcome } from '../../utils.js';

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
    // logger().newLine({ toFile: false });
    program.outputHelp();
    logger().newLine({ toFile: false });
    welcome();
    logger().newLine({ toFile: false });
}

export { parseOptions, showHelp };