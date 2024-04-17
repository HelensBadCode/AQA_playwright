import BaseComponent from "../../../components/BaseComponent.js";

export default class RemoveUserPopup extends BaseComponent{

    constructor(page) {
        super(page, page.locator('app-remove-account-modal'));
        this.removePopupTitle = this.container.locator('.modal-title', {hasText: 'Remove account'});
        this.removeUserBtn =  this.container.locator('button', {hasText: 'Remove'});
        this.cancelDeleteUserBtn = this.container.locator('.btn-secondary', {hasText: 'Cancel'});


    }

    async confirmDeleteUser(){
        await this.removeUserBtn.click();
    }
}