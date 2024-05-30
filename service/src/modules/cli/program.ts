import { Command } from 'commander';
import { Checker } from '../../classes/Checker';
import { Logger } from '../../classes/Logger';
import { Constants } from '../../constants';

const program = new Command();

program
    .name('service')
    .helpOption(false)
    .option('-d, --data-path <string>', 'path to data file', Checker.path)
    .option('-l, --log-path <string>', 'path to log file', Logger.path)
    .option('-r, --request-interval <number>', 'interval between requests to a server (s)', `${Constants.defaultRequestIntervalMs}`)
    .option('-y, --yes', 'pass this flag to start immediately');

export { program };