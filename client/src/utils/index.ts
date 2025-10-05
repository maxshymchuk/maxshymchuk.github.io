export * from './parsers';

export { createLoader } from './loader';

export function createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    attributes?: Record<string, string>,
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    if (attributes) {
        for (const [attribute, value] of Object.entries(attributes)) {
            element.setAttribute(attribute, value);
        }
    }
    return element;
}
