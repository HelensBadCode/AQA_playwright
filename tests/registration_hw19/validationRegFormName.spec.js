import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {USER_DATA} from "../../src/data/userData.js";


test.describe("Registration new user", ()=>{
    let popup

    test.describe("Negative cases for Name field", ()=> {
        test.beforeEach(async ({page}) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            popup = await welcomePage.openSignUpPopup();
        })

        test("Test validation for empty name", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.nameImput.focus();
            await popup.nameImput.blur();
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.nameInputErrorMsg).toContainText('Name required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for short name", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.nameImput.fill(USER_DATA.INVALID_LENGTH_CASE.shortLength);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.nameInputErrorMsg).toContainText('Name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for long name", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.nameImput.fill(USER_DATA.INVALID_LENGTH_CASE.longLength);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.nameInputErrorMsg).toContainText('Name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for incorrect name case1", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.nameImput.fill(USER_DATA.INVALID_NAME_CASE.incorrectNameValue1)
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.nameInputErrorMsg).toContainText('Name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for incorrect name case2", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.nameImput.fill(USER_DATA.INVALID_NAME_CASE.incorrectNameValue2)
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.nameInputErrorMsg).toContainText('Name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })


    })

})