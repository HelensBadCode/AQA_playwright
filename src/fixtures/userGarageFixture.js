import {expect as baseExpect, test as base} from "@playwright/test";
import {WelcomePage} from "../pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import {USER_LOGIN} from "../data/userLogIn.js";

export const test = base.extend({
    garagePage: async ({page}, use)=>
{
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();
    const signInPopup = await welcomePage.openSignInPopup();
    await signInPopup.emailInput.fill(USER_LOGIN.email);
    await signInPopup.passwordInput.fill(USER_LOGIN.password);
    await signInPopup.logInButton.click();

    await expect(page).toHaveURL(/garage/);
    const garagePage = new GaragePage(page);

    await use(garagePage);
  }
})

export const expect = baseExpect