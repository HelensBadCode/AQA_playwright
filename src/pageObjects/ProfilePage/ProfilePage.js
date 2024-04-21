import BasePage from "../BasePage.js";


export default class ProfilePage extends BasePage{
    constructor(page) {
        super(page, "/panel/profile");
        this.titleProfilePage =  page.locator('h1', {hasText: 'Profile'});
        this.editProfileButton = page.getByRole('button', {name: 'Edit profile'});
        this.profileFullName = page.locator('.panel-page_content .profile_name');

    };

}
