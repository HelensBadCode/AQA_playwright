import {test as setup} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {expect} from '../../src/fixtures/userGarageFixture.js';
import {USER_LOGIN} from "../../src/data/userLogIn.js";
import {TEST_USER_STORAGE_STATE_PATH} from "../../src/constants.js";

setup.describe('Setup', ()=>{
    setup("Login and Save as test user", async({page})=>{
        const welcomePage = new WelcomePage(page);
        await welcomePage.navigate();
        const signInPopup = await welcomePage.openSignInPopup();
        await signInPopup.emailInput.fill(USER_LOGIN.email);
        await signInPopup.passwordInput.fill(USER_LOGIN.password);
        await signInPopup.logInButton.click();

        await expect(page).toHaveURL(/garage/);

        await page.context().storageState({
            path: TEST_USER_STORAGE_STATE_PATH
        })
    })

})