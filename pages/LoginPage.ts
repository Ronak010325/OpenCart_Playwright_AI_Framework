import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly lblReturningCustomer: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly lblWarning: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblReturningCustomer = page.getByRole('heading', { name: 'Returning Customer' });
        this.txtEmail = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.txtPassword = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.lblWarning = page.locator('.alert-danger');
    }

    /**
     * Enters the customer email address
     * @param email - Customer email address
     */
    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    /**
     * Enters the customer password
     * @param password - Customer password
     */
    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    /**
     * Submits the login form
     */
    async clickLogin(): Promise<void> {
        await this.btnLogin.click();
    }

    /**
     * Logs in with the supplied customer credentials
     * @param email - Customer email address
     * @param password - Customer password
     */
    async login(email: string, password: string): Promise<void> {
        try {
            await this.setEmail(email);
            await this.setPassword(password);
            await this.clickLogin();
        } catch (error) {
            console.log(`Error during login: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies the login page is displayed
     * @returns Promise<boolean> - true if the login page is displayed
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            await this.lblReturningCustomer.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Verifies the login warning/error message is displayed
     * @returns Promise<boolean> - true if the warning message is displayed
     */
    async isWarningMessageDisplayed(): Promise<boolean> {
        try {
            await this.lblWarning.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking login warning message: ${error}`);
            return false;
        }
    }

    /**
     * Returns the login warning/error message text
     * @returns Promise<string> - the displayed warning message
     */
    async getWarningMessage(): Promise<string> {
        return (await this.lblWarning.innerText()).trim();
    }
}
