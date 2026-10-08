import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const projectName = (process.env.PROJECT_NAME ?? 'AllureReport').replace(/\s+/g, '');
const resultsDir = path.resolve(__dirname, 'allure-results');
const reportDir = path.resolve(__dirname, 'allure-reports', projectName);
const historySource = path.join(reportDir, 'history');
const historyTarget = path.join(resultsDir, 'history');

async function globalTeardown() {
  const historyExists = fs.existsSync(historySource);

  if (historyExists) {
    fs.cpSync(historySource, historyTarget, { recursive: true });
  }

  const cleanFlag = historyExists ? ' --clean' : '';
  execSync(`allure generate "${resultsDir}" -o "${reportDir}"${cleanFlag}`, {
    stdio: 'inherit',
    cwd: __dirname,
  });

  // spawn(`allure open "${reportDir}"`, {
  //   detached: true,
  //   stdio: 'ignore',
  //   shell: true,
  // }).unref();
}

export default globalTeardown;
