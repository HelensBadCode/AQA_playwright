import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/homework19/WelcomePage/WelcomePage.js";
import {USER_DATA} from "../../src/data/userData.js";
import GaragePage from "../../src/homework19/GaragePage/GaragePage.js";
import SettingsPage from "../../src/homework19/SettingsPage/SettingsPage.js";
import {SideBarMenu} from "../../src/homework19/GaragePage/components/SideBarMenu.js";
import RemoveUserPopup from "../../src/homework19/SettingsPage/components/RemoveUserPopup.js";


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
            const settingsPage = new SettingsPage(page);
            const removeUserPopup = new RemoveUserPopup(page);
            const sideBar = new SideBarMenu(page);
            await garagePage.navigate();
            await expect(garagePage.profileBtnInHeader).toBeVisible();
            await expect (garagePage.titleGaragePage).toContainText('Garage');

            await sideBar.openSettingsPage();
            await expect(settingsPage.removeUserBlock).toBeVisible();

            await settingsPage.removeUserAction();
            await expect(removeUserPopup.removeUserBtn).toBeVisible();
            await expect(removeUserPopup.cancelDeleteUserBtn).toBeVisible();
            await expect(removeUserPopup.removePopupTitle).toContainText('Remove account');
            await expect(removeUserPopup.removePopupTitle).toContainText('Remove account');await removeUserPopup.confirmDeleteUser();

        })

        test.only("User should be able to register", async ({page}) => {
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


