import type { Plugin, ResolvedConfig } from 'vite';
import { Eta, type EtaConfig } from 'eta';

type MaybeCallback<T> = T | ((config: ResolvedConfig) => T);

export default function plugin(
    data: MaybeCallback<Record<string, unknown>> = {},
    options?: MaybeCallback<Partial<EtaConfig>>,
): Plugin {
    let config: ResolvedConfig;
    return {
        name: 'vite-plugin-eta',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        transformIndexHtml: {
            order: 'pre',
            handler(html) {
                const _data = typeof data === 'function' ? data(config) : (data ?? {});
                const _options = typeof options === 'function' ? options(config) : (options ?? {});
                const eta = new Eta({ views: config.root, ..._options });
                return eta.renderString(html, {
                    NODE_ENV: config.mode,
                    isDev: config.mode === 'development',
                    ..._data,
                });
            },
        },
    };
}
