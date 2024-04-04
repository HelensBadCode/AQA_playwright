import { test, expect } from "@playwright/test";

test.describe("Register new user", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("");
    });

    const inputEmailValue = "aqa-elena33@gmail.com";
    const inputLastNameValue = "Turcheniuk";
    const inputPasswordValue = "Qwerty123";


    test("Test empty name field validation", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupName + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': '',
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Name required");
    });

    test("Test invalid name validation", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupName + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': '123',
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Name is invalid");
    });

    test("Test short name length validation", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupName + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': 'O',
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Name has to be from 2 to 20 characters long");
    });

    test("Test long name length validation", async ({ page }) => {
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        const signUpPopup = page.locator('app-signup-modal');
        const errorBorder = page.locator('.is-invalid');
        const errorMassage = page.locator('#signupName + .invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signUpBtn.click();
        await expect(signUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': 'Quartorittosnagorotopotychi',
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await checkValidation(page, signUpPopup.locator(errorMassage), signUpPopup.locator(errorBorder), registerBtn,"Name has to be from 2 to 20 characters long");
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

