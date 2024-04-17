import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {USER_DATA} from "../../src/data/userData.js";


test.describe("Registration new user", ()=>{
    let popup

    test.describe("Negative cases for Last name field", ()=> {
        test.beforeEach(async ({page}) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            popup = await welcomePage.openSignUpPopup();
        })


        test("Test validation for empty lastname", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.lastNameImput.focus();
            await popup.lastNameImput.blur();
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.lastNameImputErrorMsg).toContainText('Last name required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for short lastname", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.lastNameImput.fill(USER_DATA.INVALID_LENGTH_CASE.shortLength);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.lastNameImputErrorMsg).toContainText('Last name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for long lastname", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.lastNameImput.fill(USER_DATA.INVALID_LENGTH_CASE.longLength);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.lastNameImputErrorMsg).toContainText('Last name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })


        test("Test validation for incorrect lastname case1", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.lastNameImput.fill(USER_DATA.INVALID_NAME_CASE.incorrectNameValue1);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.lastNameImputErrorMsg).toContainText('Last name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for incorrect lastname case2", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.lastNameImput.fill(USER_DATA.INVALID_NAME_CASE.incorrectNameValue2);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.lastNameImputErrorMsg).toContainText('Last name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })



    })

})