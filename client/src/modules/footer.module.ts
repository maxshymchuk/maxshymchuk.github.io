function footerModule(meta: Meta): void {
    const lastUpdated = document.getElementById('updated-at');
    if (lastUpdated) {
        lastUpdated.innerText = `Updated at ${new Date(meta.timestamp).toLocaleString()}`;
    }
}

export { footerModule };
