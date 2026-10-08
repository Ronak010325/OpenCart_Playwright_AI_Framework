/**
 * Test Case: Validate successful customer registration in the OpenCart frontend
 *
 * Tags: @master @sanity @regression @web @end-to-end
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account -> Register
 * 3) Verify that the registration page is displayed
 * 4) Generate a unique customer email
 * 5) Enter valid values for the registration fields
 * 6) Accept the Privacy Policy
 * 7) Submit the registration form
 * 8) Verify that registration succeeds
 * 9) Verify the account-created confirmation
 * 10) Verify that the newly created account is available through the expected account navigation
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utilities/dataGenerator';

test('Customer registration test @master @sanity @regression @web @end-to-end', async ({ homePage, registerPage, accountSuccessPage, myAccountPage }) => {
    const userData = RandomDataUtil.generateRegistrationPayload();

    await test.step('1) Open the application', async () => {
        const isHomePageLoaded = await homePage.isHomePageExists();
        expect(isHomePageLoaded).toBeTruthy();
    });

    await test.step('2) Navigate to My Account -> Register', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('3) Verify that the registration page is displayed', async () => {
        const isRegisterPageDisplayed = await registerPage.isRegisterPageExists();
        expect(isRegisterPageDisplayed).toBeTruthy();
    });

    await test.step('4) Generate a unique customer email', async () => {
        expect(userData.email).toContain('@');
    });

    await test.step('5) Enter valid values for the registration fields', async () => {
        await registerPage.setFirstName(userData.firstName);
        await registerPage.setLastName(userData.lastName);
        await registerPage.setEmail(userData.email);
        await registerPage.setPassword(userData.password);
    });

    await test.step('6) Accept the Privacy Policy', async () => {
        await registerPage.acceptPrivacyPolicy();
    });

    await test.step('7) Submit the registration form', async () => {
        await registerPage.clickContinue();
    });

    await test.step('8) Verify that registration succeeds', async () => {
        const isRegistrationSuccessful = await accountSuccessPage.isAccountSuccessPageExists();
        expect(isRegistrationSuccessful).toBeTruthy();
    });

    await test.step('9) Verify the account-created confirmation', async () => {
        const isConfirmationDisplayed = await accountSuccessPage.isAccountCreatedMessageDisplayed();
        expect(isConfirmationDisplayed).toBeTruthy();
    });

    await test.step('10) Verify that the newly created account is available through the expected account navigation', async () => {
        await accountSuccessPage.clickContinue();
        const isMyAccountPageDisplayed = await myAccountPage.isMyAccountPageExists();
        expect(isMyAccountPageDisplayed).toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});
