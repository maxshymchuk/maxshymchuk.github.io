function logKeyValue(key: string, value: string, newLine = false, padding = 25) {
    console.log(key.padEnd(padding), value);
    if (newLine) console.log();
}

function logInline(text: string, fromStart = true) {
    if (fromStart) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    }
    process.stdout.write(text);
}

function logWelcome(clearScreen = true) {
    if (clearScreen) console.clear();
    logKeyValue('Check interval:', `${globalThis.checkInterval}ms (~${Math.round(globalThis.checkInterval / 1000)}s)`);
    logKeyValue('Request interval:', `${globalThis.requestInterval}ms (~${Math.round(globalThis.requestInterval / 3600000)}h)`);
    logKeyValue('Data file path:', globalThis.dataPath);
    logKeyValue('Log file path:', globalThis.logPath, true);
}

export { logWelcome, logKeyValue, logInline };