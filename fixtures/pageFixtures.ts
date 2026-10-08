import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountSuccessPage } from '../pages/AccountSuccessPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const APP_URL = process.env.BASE_URL_WEB || 'http://localhost/opencart/upload/';

type PageFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    accountSuccessPage: AccountSuccessPage;
    myAccountPage: MyAccountPage;
    loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    accountSuccessPage: async ({ page }, use) => {
        await use(new AccountSuccessPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

test.afterEach(async ({ page, context }) => {
    if (!page.isClosed()) {
        await page.close();
    }
    await context.close();
});

export { expect } from '@playwright/test';
