import { execSync } from 'child_process';
import * as fs from 'fs';
import { loadConfig } from '../config';

export function init(): void {
    const config = loadConfig();

    if (!fs.existsSync(config.fabricSamplesPath)) {
        console.log('fabric-samples not found — cloning...');
        const parentDir = require('path').dirname(config.fabricSamplesPath);
        fs.mkdirSync(parentDir, { recursive: true });
        execSync('git clone https://github.com/hyperledger/fabric-samples.git', {
            cwd: parentDir,
            stdio: 'inherit',
        });
    } else {
        console.log(`Using existing fabric-samples at ${config.fabricSamplesPath}`);
    }

    const testNetworkDir = `${config.fabricSamplesPath}/test-network`;
    console.log('Bringing up the network...');
    execSync(`./network.sh up createChannel -c ${config.channelName} -ca`, {
        cwd: testNetworkDir,
        stdio: 'inherit',
    });

    console.log('\n✔ Network is up. Run "amanadb deploy" next.');
}