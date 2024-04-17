import BaseComponent from "../../../components/BaseComponent.js";


export class SignUpPopup  extends BaseComponent{
    _nameInputSelector = '#signupName';
    _lastNameInputSelector = '#signupLastName';
    _emailInputSelector = '#signupEmail';
    _passwordInputSelector = '#signupPassword';
    _repeatPasswordInputSelector = '#signupRepeatPassword';
    _borderColorSelector = '.is-invalid';
    constructor(page) {
        super(page, page.locator('app-signup-modal'));

        this.titlePopup = page.locator('.modal-title');

        this.nameImput = this.container.locator(this._nameInputSelector);
        this.nameInputErrorMsg = this.container.locator(`${this._nameInputSelector} + .invalid-feedback`);

        this.lastNameImput = this.container.locator(this._lastNameInputSelector);
        this.lastNameImputErrorMsg = this.container.locator(`${this._lastNameInputSelector} + .invalid-feedback`);

        this.emailImput = this.container.locator(this._emailInputSelector);
        this.emailImputErrorMsg = this.container.locator(`${this._emailInputSelector} + .invalid-feedback`);

        this.passwordImput = this.container.locator(this._passwordInputSelector);
        this.passwordImputErrorMsg = this.container.locator(`${this._passwordInputSelector} + .invalid-feedback`);

        this.repeatPasswordImput = this.container.locator(this._repeatPasswordInputSelector);
        this.repeatPasswordImputErrorMsg = this.container.locator(`${this._repeatPasswordInputSelector} + .invalid-feedback`);

        this.registerBtn = this.container.locator('button', { hasText: 'Register' });

        this.errorBorder = this.container.locator(this._borderColorSelector);


    }
}