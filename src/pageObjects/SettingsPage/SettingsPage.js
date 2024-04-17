import BasePage from "../BasePage.js";
import RemoveUserPopup from "./components/RemoveUserPopup.js";

export default class SettingsPage extends BasePage{

    constructor(page) {
        super(page, '/panel/settings');
        this.removeUserBlock = page.locator('.user-settings_form', {hasText: 'Remove account'});
        this.removeUserButton = page.locator('.-remove-account button');

    };

    async removeUserAction(){
        await this.removeUserButton.click();
        return new RemoveUserPopup(this._page);
    }

}