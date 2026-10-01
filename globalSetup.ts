import fs from 'fs';
import path from 'path';

const allureResultsDir = path.resolve(__dirname, 'allure-results');

async function globalSetup() {
  fs.rmSync(allureResultsDir, { recursive: true, force: true });
}

export default globalSetup;
