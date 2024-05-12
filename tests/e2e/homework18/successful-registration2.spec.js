import { test, expect } from "@playwright/test";

test.describe("Register new user", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("");
    });

    const inputEmailValue = "aqa-vitya34@gmail.com";
    const inputNameValue = "Viktor";
    const inputLastNameValue = "Zinchenko";
    const inputPasswordValue = "Qwerty123";

    test("Test of successful user registration via the Sing In button", async ({ page }) => {
        const signInBtn = page.locator('button', { hasText: 'Sign In' });
        const sinInPopup = page.locator('app-signin-modal');
        const registerLink = page.locator('button', { hasText: 'Registration' });
        const sinUpPopup = page.locator('app-signup-modal');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        await signInBtn.click();
        await expect(sinInPopup.locator('.modal-title')).toContainText("Log in");

        await registerLink.click();
        await expect(sinUpPopup.locator('.modal-title')).toContainText("Registration");

        await fillForm(page, {
            '#signupName': inputNameValue,
            '#signupLastName': inputLastNameValue,
            '#signupEmail': inputEmailValue,
            '#signupPassword': inputPasswordValue,
            '#signupRepeatPassword': inputPasswordValue
        });

        await registerBtn.click();
        await expect(page).toHaveURL('/panel/garage');

        //Delete acc
        const profileBtnInHeader = page.locator("#userNavDropdown");
        const settingsSection = page.locator('.user-nav_link', {hasText: 'Settings'})
        const removeUserBlock = page.locator('.user-settings_form', {hasText: 'Remove account'});
        const removeUserButton = page.locator('button', {hasText: 'Remove my account'});
        const deletePopup = page.locator('app-remove-account-modal');
        const removePopupTitle = deletePopup.locator('.modal-title', {hasText: 'Remove account'});
        const beforeDeleteInfo = deletePopup.locator('.modal-body');
        const deleteUserBtn = page.locator('.btn-danger', {hasNotText: 'account'});
        const cancelDeleteUserBtn = page.locator('.btn-secondary', {hasText: 'Cancel'});


        await profileBtnInHeader.click();
        await settingsSection.click();
        await removeUserBlock.focus();
        await removeUserButton.click();
        await expect(removePopupTitle).toContainText('Remove account');
        await expect(beforeDeleteInfo).toContainText('Do you really wnat to completely remove your account?');
        await expect(beforeDeleteInfo).toContainText('All data will be lost, this action can not be undone!');
        await deleteUserBtn.click();
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

