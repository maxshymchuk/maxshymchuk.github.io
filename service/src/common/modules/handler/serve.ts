import { writeFile } from 'fs/promises';
import { Checker } from '../../classes/Checker';
import { logger } from '../../classes/Logger';
import { stringify } from '../../utils';
import { patchGist } from '../../api';

async function serve(checker: Checker): Promise<Nullable<Data>> {
    logger().fromStartScreen().log('Checking', { toFile: false });

    if (checker.isUpToDate) return checker.data;

    logger().fromStartScreen().log('Request attempt');

    try {
        const { isEqual, data } = await checker.check();

        if (isEqual) {
            logger().log(' -> equal', { withTimestamp: false }).newLine();
        } else {
            logger().log(' -> different', { withTimestamp: false }).newLine();
            try {
                await writeFile(Checker.path, stringify(data, true));
                logger().log('Data update succeed').newLine();
            } catch (error) {
                logger().log(`Data update failed: ${error}`).newLine();
            }
            try {
                const { history } = await patchGist(stringify(data, true));
                logger().log('Gist update succeed').newLine();
                logger().log(`New version -> ${history[0].version}`, { toScreen: false }).newLine()
            } catch (error) {
                logger().log(`Gist update failed: ${error}`).newLine();
            }
        }

        return data;
    } catch (error) {
        logger().log(`${error}`, { withTimestamp: false }).newLine();
        return checker.data;
    }
}

export { serve };