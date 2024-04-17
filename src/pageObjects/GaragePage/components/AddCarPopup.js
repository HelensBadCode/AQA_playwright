import BaseComponent from "../../../components/BaseComponent.js";


export class AddCarPopup  extends BaseComponent{

    constructor(page) {
        super(page, page.locator('modal-content'));
        this.addCarPopupTitle = page.locator('.modal-title', {hasText: 'Add a car'});
        this.selectAddCarBrand = page.locator('#addCarBrand');
        this.selectAddCarModel = page.locator('#addCarModel');
        this.imputAddCarMileage = page.locator('#addCarMileage');
        this.submitNewCarButton = page.getByRole('button', { name: 'Add' });

    }



}