import { defaultApi } from './constants';
import type { Adapter } from './types';

export function createAdapter(adapter: Adapter): Adapter {
    return () => adapter(defaultApi);
}
