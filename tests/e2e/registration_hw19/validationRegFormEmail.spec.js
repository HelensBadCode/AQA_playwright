import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../../src/pageObjects/WelcomePage/WelcomePage.js";
import {USER_DATA} from "../../../src/data/userData.js";


test.describe("Registration new user", ()=>{
    let popup

    test.describe("Negative cases for Email field", ()=> {
        test.beforeEach(async ({page}) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            popup = await welcomePage.openSignUpPopup();
        })

        test("Test validation for empty email", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.emailImput.focus();
            await popup.emailImput.blur();
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.emailImputErrorMsg).toContainText('Email required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for short email", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.emailImput.fill(USER_DATA.INVALID_LENGTH_CASE.shortLength);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.emailImputErrorMsg).toContainText('Email is incorrect');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for invalid format email case1", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.emailImput.fill(USER_DATA.INVALID_INCORRECT_EMAIL_CASE.emailNoSymbol);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.emailImputErrorMsg).toContainText('Email is incorrect');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for invalid format email case2", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.emailImput.fill(USER_DATA.INVALID_INCORRECT_EMAIL_CASE.emailNonLatin);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.emailImputErrorMsg).toContainText('Email is incorrect');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

    })

})