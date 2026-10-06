import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { homePage } from "../../pages/enduserpages/homePage";
import { registerPage } from "../../pages/enduserpages/registrationPage";
import { DataProvider } from "../../utilities/DataReader";
import { executeQuery } from "../../utilities/dbClient";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

test.describe("Registeration Functionality", async () => {
  test.skip("User Should be able to Register Himself", async ({ page }) => {
    const baseURL = process.env.BASE_URL_WEB;
    if (baseURL) {
      await page.goto(baseURL);
      const HomePage = new homePage(page);
      await HomePage.clickMyAccountBtn();
      await HomePage.selectRegOption("Register");

      const RegisterPage = new registerPage(page);
      await RegisterPage.fillDetails(
        "demo first name",
        "demo last name",
        "demo@gmail.com",
        "demo password",
      );
      await RegisterPage.clickContinue();
      await RegisterPage.verifyReg();
    }
  });

  const userData = DataProvider.readJson("./testdata/RegistrationTestData.json");
  userData.forEach((object: { firstName: any; lastName: any; email: any; password: any }) => {
    test(`${object.firstName} Should be able to Register Himself`, async ({page}) => {
        const baseURL = process.env.BASE_URL_WEB;
        if (baseURL) {
          await page.goto(baseURL);
          const HomePage = new homePage(page);
          await HomePage.clickMyAccountBtn();
          await HomePage.selectRegOption("Register");

          const RegisterPage = new registerPage(page);
          await RegisterPage.fillDetails(
            object.firstName,
            object.lastName,
            object.email,
            object.password,
          );
          await RegisterPage.clickContinue();
          await RegisterPage.verifyReg();
        }
    });
  });

  userData.forEach((object: { firstName: any; lastName: any; email: any; password: any }) => {
    test(`${object.firstName} is registered in DB`, async() => {
        const query = "SELECT * FROM `oc_customer` WHERE firstname = ?";
        const result = await executeQuery(query, [object.firstName]);
        const size = result[0] as any[];
        expect(size.length).toBe(1);
    });
  });
});
