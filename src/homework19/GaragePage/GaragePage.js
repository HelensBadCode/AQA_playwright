import BasePage from "../BasePage.js";


export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, "/panel/garage");
        this.titleGaragePage =  page.locator('h1', {hasText: 'Garage'});
        this.profileBtnInHeader = page.getByRole('button', {name: 'My profile'});
    };


}