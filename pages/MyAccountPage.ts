import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly lblMyAccount: Locator;
    private readonly lnkAccountInformation: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblMyAccount = page.getByRole('heading', { name: 'My Account', level: 1 });
        this.lnkAccountInformation = page.getByRole('link', { name: 'Edit your account information' });
    }

    /**
     * Verifies the My Account page is displayed
     * @returns Promise<boolean> - true if the My Account page is displayed
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.lblMyAccount.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking my account page: ${error}`);
            return false;
        }
    }

    /**
     * Verifies the browser is on the authenticated My Account URL
     * @returns Promise<boolean> - true if the My Account URL is loaded
     */
    async isMyAccountUrl(): Promise<boolean> {
        try {
            return this.page.url().includes('route=account/account');
        } catch (error) {
            console.log(`Error checking my account URL: ${error}`);
            return false;
        }
    }

    /**
     * Verifies the authenticated account dashboard navigation is displayed
     * @returns Promise<boolean> - true if the account dashboard is displayed
     */
    async isAccountDashboardExists(): Promise<boolean> {
        try {
            await this.lnkAccountInformation.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking account dashboard: ${error}`);
            return false;
        }
    }
}
