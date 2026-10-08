/**
 * Test Case: Validate valid and invalid customer login in the OpenCart frontend
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps (Valid Login):
 * 1) Open the application
 * 2) Navigate to My Account -> Login
 * 3) Verify that the login page is displayed
 * 4) Enter valid customer credentials from the configured env file
 * 5) Submit the login form
 * 6) Verify successful authentication
 * 7) Verify that the user is redirected to the My Account section
 * 8) Verify that the account dashboard is visible
 *
 * Steps (Invalid Login):
 * 1) Open the application
 * 2) Navigate to My Account -> Login
 * 3) Enter an invalid email and password
 * 4) Submit the login form
 * 5) Verify that authentication fails
 * 6) Verify the expected warning message
 * 7) Verify that the customer is not authenticated
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utilities/dataGenerator';

test('Valid login test @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    test.slow();

    const validEmail = process.env.ENDUSER_EMAIL ?? '';
    const validPassword = process.env.ENDUSER_PASSWORD ?? '';

    await test.step('1) Open the application', async () => {
        const isHomePageLoaded = await homePage.isHomePageExists();
        expect(isHomePageLoaded).toBeTruthy();
    });

    await test.step('2) Navigate to My Account -> Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('3) Verify that the login page is displayed', async () => {
        const isLoginPageDisplayed = await loginPage.isLoginPageExists();
        expect(isLoginPageDisplayed).toBeTruthy();
    });

    await test.step('4) Enter valid customer credentials from the configured env file', async () => {
        expect(validEmail).toBeTruthy();
        expect(validPassword).toBeTruthy();
        await loginPage.setEmail(validEmail);
        await loginPage.setPassword(validPassword);
    });

    await test.step('5) Submit the login form', async () => {
        await loginPage.clickLogin();
    });

    await test.step('6) Verify successful authentication', async () => {
        const isAuthenticated = await myAccountPage.isMyAccountPageExists();
        expect(isAuthenticated).toBeTruthy();
    });

    await test.step('7) Verify that the user is redirected to the My Account section', async () => {
        const isRedirectedToMyAccount = await myAccountPage.isMyAccountUrl();
        expect(isRedirectedToMyAccount).toBeTruthy();
    });

    await test.step('8) Verify that the account dashboard is visible', async () => {
        const isDashboardVisible = await myAccountPage.isAccountDashboardExists();
        expect(isDashboardVisible).toBeTruthy();
    });

    console.log('✅ ✔️ Completed successfully!');
});

test('Invalid login test @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    test.slow();

    const invalidEmail = RandomDataUtil.getEmail();
    const invalidPassword = RandomDataUtil.getPassword();

    await test.step('1) Open the application', async () => {
        const isHomePageLoaded = await homePage.isHomePageExists();
        expect(isHomePageLoaded).toBeTruthy();
    });

    await test.step('2) Navigate to My Account -> Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('3) Enter an invalid email and password', async () => {
        await loginPage.setEmail(invalidEmail);
        await loginPage.setPassword(invalidPassword);
    });

    await test.step('4) Submit the login form', async () => {
        await loginPage.clickLogin();
    });

    await test.step('5) Verify that authentication fails', async () => {
        const isWarningDisplayed = await loginPage.isWarningMessageDisplayed();
        expect(isWarningDisplayed).toBeTruthy();
    });

    await test.step('6) Verify the expected warning message', async () => {
        const warningMessage = await loginPage.getWarningMessage();
        expect(warningMessage).toContain('Warning: No match for E-Mail Address and/or Password.');
    });

    await test.step('7) Verify that the customer is not authenticated', async () => {
        const isLoginPageDisplayed = await loginPage.isLoginPageExists();
        const isMyAccountUrl = await myAccountPage.isMyAccountUrl();
        expect(isLoginPageDisplayed).toBeTruthy();
        expect(isMyAccountUrl).toBeFalsy();
    });

    console.log('✅ ✔️ Completed successfully!');
});
