import {SignUpPopup} from "./components/SignUpPopup.js";
import BasePage from "../BasePage.js";
import {SignInPopup} from "./components/SignInPopup.js";


export class WelcomePage extends BasePage{
    constructor(page) {
        super(page, "/")
        this.signUpBtn = page.locator('button', { hasText: 'Sign up' });
    }

    async openSignUpPopup(){
        await this.signUpBtn.click();
        return new SignUpPopup(this._page);
    }

    async openSignInPopup(){
        await this.header.signInButton.click();
        return new SignInPopup(this._page);
    }

}