import BaseComponent from "./BaseComponent.js";


export default class Header extends BaseComponent {
    constructor(page) {
        super(page, page.locator('header'));
        this.profileBtnInHeader = page.getByRole('button', {name: 'My profile'});
        this.signInButton =  page.locator('button', {hasText: 'Sign In'});
    }
}