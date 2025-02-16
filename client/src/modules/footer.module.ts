function footerModule(meta: Meta): void {
    const footer = document.getElementById('footer');
    const lastUpdated = footer?.querySelector('.last-updated') as Nullable<HTMLSpanElement>;
    if (lastUpdated) {
        lastUpdated.innerText = `Last updated: ${new Date(meta.timestamp).toLocaleString()}`;
    }
}

export { footerModule };
