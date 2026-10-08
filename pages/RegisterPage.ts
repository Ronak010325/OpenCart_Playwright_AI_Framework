import { Page, Locator } from '@playwright/test';
import { AccountSuccessPage } from './AccountSuccessPage';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly lblRegisterAccount: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly chkPrivacyPolicy: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblRegisterAccount = page.getByRole('heading', { name: 'Register Account' });
        this.txtFirstName = page.getByRole('textbox', { name: '* First Name' });
        this.txtLastName = page.getByRole('textbox', { name: '* Last Name' });
        this.txtEmail = page.getByRole('textbox', { name: '* E-Mail' });
        this.txtPassword = page.getByRole('textbox', { name: '* Password' });
        this.chkPrivacyPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
    }

    /**
     * Enters the customer first name
     * @param firstName - Customer first name
     */
    async setFirstName(firstName: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
    }

    /**
     * Enters the customer last name
     * @param lastName - Customer last name
     */
    async setLastName(lastName: string): Promise<void> {
        await this.txtLastName.fill(lastName);
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
     * Accepts the Privacy Policy checkbox
     */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.chkPrivacyPolicy.check();
    }

    /**
     * Submits the registration form
     * @returns Promise<AccountSuccessPage> - Instance of the account success page
     */
    async clickContinue(): Promise<AccountSuccessPage> {
        await this.btnContinue.click();
        return new AccountSuccessPage(this.page);
    }

    /**
     * Verifies the registration page is displayed
     * @returns Promise<boolean> - true if the registration page is displayed
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            await this.lblRegisterAccount.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }
}
