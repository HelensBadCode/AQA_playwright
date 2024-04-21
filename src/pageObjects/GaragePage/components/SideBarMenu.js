import BaseComponent from "../../../components/BaseComponent.js";
import SettingsPage from "../../SettingsPage/SettingsPage.js";
import ProfilePage from "../../ProfilePage/ProfilePage.js";


export class SideBarMenu  extends BaseComponent{

    constructor(page) {
        super(page, page.locator('nav'));
        this.sideBarMenuSettings = page.locator('.sidebar_btn', {hasText: 'Settings'});
        this.sideBarMenuProfile = page.locator('.sidebar_btn', {hasText: 'Profile'});

    }

    async openSettingsPage(){
        await this.sideBarMenuSettings.click();
        return new SettingsPage(this._page);
    }

    async openProfilePage(){
        await this.sideBarMenuProfile.click();
        return new ProfilePage(this._page);
    }


}