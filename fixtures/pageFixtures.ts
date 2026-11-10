import { test as Base, expect } from '@playwright/test';
import { homePage } from '../pages/enduserpages/homePage';
import { registerPage } from '../pages/enduserpages/registrationPage';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const BASE_URL_WEB = process.env.BASE_URL_WEB || 'http://localhost/opencart/upload/';

type PageFixtures = {
    homePage : homePage,
    registrationPage : registerPage
}

export const test = Base.extend<PageFixtures>({
    homePage : async({page}, use) => {
        await page.goto(BASE_URL_WEB);
        await use(new homePage(page));
    },
    registrationPage : async({page}, use) => {
        await use(new registerPage(page));
    }
});

test.afterEach(async({page, context}) => {
    if(!page.isClosed()) {
        await page.close();
    }
    await context.close();
});

export {expect} from '@playwright/test';