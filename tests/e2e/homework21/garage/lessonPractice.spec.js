import {expect, test} from "@playwright/test";
import {USER_LOGIN} from "../../../../src/data/userLogIn.js";
import {WelcomePage} from "../../../../src/pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../../../../src/pageObjects/GaragePage/GaragePage.js";

test.describe('test',() =>{
    let welcomePage
    let garagePage

    test.beforeEach(async ({page}) => {
        welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const signInPopup = await welcomePage.openSignInPopup();
        await signInPopup.emailInput.fill(USER_LOGIN.email);
        await signInPopup.passwordInput.fill(USER_LOGIN.password);
        await signInPopup.logInButton.click();

        await expect(page).toHaveURL(/garage/);
        garagePage = new GaragePage(page);

    })
   test('test garage', async ({page}) => {
       await expect(garagePage.addCarButton).toBeVisible();
   })
});

// test.describe('test',() =>{
//     test('test garage', async ({page}) => {
//         await page.goto('https://qauto.forstudy.space/');
//         await page.getByRole('button', {name: 'Sign In'}).click();
//
//         await page.getByLabel('Email').fill(USER_LOGIN.email);
//         await page.getByLabel('Password').fill(USER_LOGIN.password);
//         await page.locator('form div').filter({hasText: 'Remember me Forgot password'}).locator('div').click();
//
//         await page.getByRole('button', {name: 'Login'}).click();
//         await expect(page.getByRole('button',{name: 'Add car'})).toBeVisible();
//     })
// });