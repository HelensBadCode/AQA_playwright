import { test, expect } from "@playwright/test";

test.describe("Validation registration form", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("");
    });

    const inputEmailValue = "aqa-elena33@gmail.com";
    const inputNameValue = "Olena";
    const inputLastNameValue = "Turcheniuk";
    const inputPasswordValue = "Qwerty123";


    test("Test empty password field validation", async ({page}) => {
        const signUpBtn = page.locator('button', {hasText: 'Sign up'});
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupPassword + .invalid-feedback');
        const registerBtn = page.locator('button', {hasText: 'Register'});

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': '',
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Password required");
    });

    test("Test invalid password validation", async ({page}) => {
        const signUpBtn = page.locator('button', {hasText: 'Sign up'});
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupPassword + .invalid-feedback');
        const registerBtn = page.locator('button', {hasText: 'Register'});

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': 'qwerty1',
            '#signupRepeatPassword': 'qwerty1'
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    });

    test("Test short password length validation", async ({page}) => {
        const signUpBtn = page.locator('button', {hasText: 'Sign up'});
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupPassword + .invalid-feedback');
        const registerBtn = page.locator('button', {hasText: 'Register'});

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': 'Qwert',
            '#signupRepeatPassword': 'Qwert'
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    });


    test("Test long password length validation", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupPassword + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': 'Qwewteryutwurtuer736487374',
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
    });

    test("Test invalid password validation - only numbers", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupPassword + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': '123',
            '#signupRepeatPassword': '123'
        });

        const errorElements = await signUpPopup.locator(errorMassage).elementHandles();
        const errorMessages = await Promise.all(errorElements.map(async element => await element.innerText()));
        await expect(errorMessages).toContain("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
        await expect(signUpPopup.locator(errorBorder)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerBtn).toBeDisabled();
    });

    test("Test unmatched passwords validation", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupRepeatPassword + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': 'MismatchedPassword'
        });

        await page.click('body');
        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");


    });

    test("Test form without enter re-entering password", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupRepeatPassword + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': ''
        });

        await page.click('body');
        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Re-enter password required");
    });

});

async function fillForm(page, formData) {
    for (const [selector, value] of Object.entries(formData)) {
        const input = await page.locator(selector);

        await expect(input).toBeVisible();
        await expect(input).toBeEditable();

        await input.fill(value);
        await expect(input).toHaveValue(value);
    }
}

async function checkValidation(page, errorMassageLocator, errorBorderLocator, registerBtnLocator, expectedErrorMessage) {
    await expect(errorMassageLocator).toContainText(expectedErrorMessage);
    await expect(errorBorderLocator).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(registerBtnLocator).toBeDisabled();
}



