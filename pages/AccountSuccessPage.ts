import { Page, Locator } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export class AccountSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly lblAccountCreated: Locator;
    private readonly lblConfirmationMessage: Locator;
    private readonly lnkContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lblAccountCreated = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.lblConfirmationMessage = page.getByText('Congratulations! Your new account has been successfully created!');
        this.lnkContinue = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the account success page is displayed
     * @returns Promise<boolean> - true if the account success page is displayed
     */
    async isAccountSuccessPageExists(): Promise<boolean> {
        try {
            await this.lblAccountCreated.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking account success page: ${error}`);
            return false;
        }
    }

    /**
     * Verifies the account-created confirmation message is displayed
     * @returns Promise<boolean> - true if the confirmation message is displayed
     */
    async isAccountCreatedMessageDisplayed(): Promise<boolean> {
        try {
            await this.lblConfirmationMessage.waitFor({ state: 'visible' });
            return true;
        } catch (error) {
            console.log(`Error checking account created message: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Continue link to open the My Account page
     * @returns Promise<MyAccountPage> - Instance of the My Account page
     */
    async clickContinue(): Promise<MyAccountPage> {
        await this.lnkContinue.click();
        return new MyAccountPage(this.page);
    }
}
