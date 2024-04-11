import {expect, test} from "@playwright/test";
import {WelcomePage} from "../../src/homework19/WelcomePage/WelcomePage.js";
import {USER_DATA} from "../../src/data/userData.js";


test.describe("Registration new user", ()=>{
    let popup
    const errorText = "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    test.describe("Negative cases for Password field", ()=> {
        test.beforeEach(async ({page}) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            popup = await welcomePage.openSignUpPopup();
        })


        test("Test validation for empty password", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.passwordImput.focus();
            await popup.passwordImput.blur();
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.repeatPasswordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.passwordImputErrorMsg).toContainText('Password required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for empty re-enter password", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.repeatPasswordImput.focus();
            await popup.repeatPasswordImput.blur();
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);


            await expect(popup.repeatPasswordImputErrorMsg).toContainText('Re-enter password required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for invalid password", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.passwordImput.fill(USER_DATA.INVALID_PASSWORD_CASE.incorrectPSWD);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.repeatPasswordImput.fill(USER_DATA.INVALID_PASSWORD_CASE.incorrectPSWD);


            await expect(popup.passwordImputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for short password", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.passwordImput.fill(USER_DATA.INVALID_LENGTH_CASE.shortLength);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.repeatPasswordImput.fill(USER_DATA.INVALID_PASSWORD_CASE.incorrectPSWD);


            await expect(popup.passwordImputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test validation for invalid password - only numbers", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.passwordImput.fill(USER_DATA.INVALID_PASSWORD_CASE.onlyNumbers);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.repeatPasswordImput.fill(USER_DATA.INVALID_PASSWORD_CASE.onlyNumbers);


            await expect(popup.passwordImputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })

        test("Test unmatched passwords validation", async () => {
            // await expect(popup.titlePopup.toContainText("Registration"));

            await popup.passwordImput.fill(USER_DATA.POSITIVE_CASE.inputPasswordValue);
            await popup.nameImput.fill(USER_DATA.POSITIVE_CASE.inputNameValue);
            await popup.lastNameImput.fill(USER_DATA.POSITIVE_CASE.inputLastNameValue);
            await popup.emailImput.fill(USER_DATA.POSITIVE_CASE.inputEmailValue);
            await popup.repeatPasswordImput.fill(USER_DATA.INVALID_PASSWORD_CASE.differentPSWD);
            await popup.repeatPasswordImput.blur();


            await expect(popup.repeatPasswordImputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        })


    })

})