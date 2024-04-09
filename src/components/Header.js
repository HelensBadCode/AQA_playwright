import BaseComponent from "./BaseComponent.js";


export default class Header extends BaseComponent {
    constructor(page) {
        super(page, page.locator('header'));
        this.profileBtnInHeader = page.getByRole('button', {name: 'My profile'});
    }
}