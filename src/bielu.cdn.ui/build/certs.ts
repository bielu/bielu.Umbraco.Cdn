// This script sets up HTTPS for the application using the ASP.NET Core HTTPS certificate
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg?.groups?.value ?? process.env.npm_package_name;

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    var fetchCert = child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '-t',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', });

    var exitCode = fetchCert.status ?? 0;
    if (exitCode !== 0) {
        process.exit(exitCode)
    }
}

const cert = fs.readFileSync(certFilePath, 'utf8');
const key = fs.readFileSync(keyFilePath, 'utf8');

console.log(certFilePath);
export {
    cert,
    key
}