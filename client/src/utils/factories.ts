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

export function createIcon(html?: string) {
    if (!html) return;
    const template = createElement('template');
    template.innerHTML = html;
    const node = template.content.firstElementChild;
    if (node) {
        node.classList.add('icon');
        return node;
    }
}
