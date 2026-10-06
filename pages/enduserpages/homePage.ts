import {Locator, Page} from "@playwright/test";

export class homePage {
    readonly MyAccountBtn: Locator;
    readonly MyAccountDropdown: Locator;

    constructor(private readonly page: Page) {
        this.MyAccountBtn = page.locator("//span[contains(text(),'My Account')]");
        this.MyAccountDropdown = page.locator('ul.dropdown-menu.dropdown-menu-right.show li')
    }

    async clickMyAccountBtn(): Promise<void> {
        await this.MyAccountBtn.click();
    }

    async selectRegOption(value: string): Promise<void> {
        const totalOptions = this.MyAccountDropdown;
        for(let i = 0 ; i < (await totalOptions.all()).length ; i++) {
            if(await totalOptions.nth(i).textContent() == value) {
                totalOptions.nth(i).click();
                break;
            }
        }
    }
}