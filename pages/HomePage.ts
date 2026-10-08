import { Page, Locator } from '@playwright/test';
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly btnMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.btnMyAccount = page.getByRole('button', { name: 'My Account' });
        this.lnkRegister = page.getByRole('link', { name: 'Register' });
        this.lnkLogin = page.getByRole('link', { name: 'Login' });
    }

    /**
     * Opens the My Account dropdown in the store header
     */
    async clickMyAccount(): Promise<void> {
        await this.btnMyAccount.click();
    }

    /**
     * Clicks the Register link from the My Account dropdown
     * @returns Promise<RegisterPage> - Instance of the registration page
     */
    async clickRegister(): Promise<RegisterPage> {
        await this.lnkRegister.click();
        return new RegisterPage(this.page);
    }

    /**
     * Clicks the Login link from the My Account dropdown
     * @returns Promise<LoginPage> - Instance of the login page
     */
    async clickLogin(): Promise<LoginPage> {
        await this.lnkLogin.click();
        return new LoginPage(this.page);
    }

    /**
     * Verifies the home page is displayed
     * @returns Promise<boolean> - true if the home page is displayed
     */
    async isHomePageExists(): Promise<boolean> {
        try {
            await this.btnMyAccount.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking home page: ${error}`);
            return false;
        }
    }
}
