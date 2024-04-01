import { test, expect } from "@playwright/test";

test.describe("Register new user", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("");
    });

    const inputEmailValue = "aqa-elena33@gmail.com";
    const inputNameValue = "Olena";
    const inputLastNameValue = "Turcheniuk";
    const inputPasswordValue = "Qwerty123";


    test("Test empty email field validation", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('.invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': '',
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Email required");
    });

    test("Test invalid format email validation, must be present @", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('.invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': 'aqa-elena33gmail.com',
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Email is incorrect");
    });

    test("Test invalid format email validation, must be only English language", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('.invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': 'оленка33gmail.com',
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Email is incorrect");
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

