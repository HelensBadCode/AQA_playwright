import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {USER_DATA} from "../../src/data/userData.js";
import GaragePage from "../../src/pageObjects/GaragePage/GaragePage.js";




test.describe("Registration new user", ()=> {

    test.describe("Positive case", () => {
        let popup

        test.beforeEach(async ({page}) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            popup = await welcomePage.openSignUpPopup();


        })

        test.afterEach(async ({page}) => {
            const garagePage = new GaragePage(page);
            const header = await garagePage.header;
            await garagePage.navigate();
            await expect(header.profileBtnInHeader).toBeVisible();
            await expect (garagePage.titleGaragePage).toContainText('Garage');

            const sideBar = await garagePage.sideBar;
            const settingsPage = await sideBar.openSettingsPage();
            await expect(settingsPage.removeUserBlock).toBeVisible();
            const removePopup = await settingsPage.removeUserAction();

            await expect(removePopup.removeUserBtn).toBeVisible();
            await expect(removePopup.cancelDeleteUserBtn).toBeVisible();
            await expect(removePopup.removePopupTitle).toContainText('Remove account');
            await expect(removePopup.removePopupTitle).toContainText('Remove account');
            await removePopup.confirmDeleteUser();

        })

        test("User should be able to register", async ({page}) => {
            await expect(popup.titlePopup).toContainText('Registration');

            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.registerBtn.click();

            await expect(page, "User should be redirected to garage page").toHaveURL('/panel/garage');

        })

    })
})


