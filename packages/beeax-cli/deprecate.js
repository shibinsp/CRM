#!/usr/bin/env node
const message = `\nTwenty CLI (beeax-cli) is deprecated.\n\nPlease install and use the new package instead:\n  npm install -g beeax-sdk\n\nThe command name remains the same: \"beeax\".\nMore info: https://www.npmjs.com/package/beeax-sdk\n`;

console.error(message);
process.exitCode = 1;
