import {Page, Locator, expect} from "@playwright/test";

export class registerPage {
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly privacyCheckBox: Locator;
    readonly continueBtn: Locator;
    readonly heading: Locator;

    constructor(private readonly page: Page) {
        this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
        this.emailField = page.getByRole('textbox', { name: 'E-Mail' });
        this.passwordField = page.getByLabel('Password');
        this.privacyCheckBox = page.locator('[name="agree"]');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.heading = page.locator("//h1[normalize-space()='Your Account Has Been Created!']");
    }

    async fillDetails(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.privacyCheckBox.check();
    }
    
    async clickContinue(): Promise<void> {
        await this.continueBtn.click();
    }

    async verifyReg(): Promise<void> {
        await expect(this.heading).toBeVisible();
    }
}