import BasePage from "../BasePage.js";
import {SideBarMenu} from "./components/SideBarMenu.js";
import Header from "../../components/Header.js";
import {AddCarPopup} from "./components/AddCarPopup.js";


export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, "/panel/garage");
        this.titleGaragePage =  page.locator('h1', {hasText: 'Garage'});
        this.sideBar = new SideBarMenu(this._page);
        this.header = new Header(this._page);

        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.existingCarsList = page.locator('.car-list .car-item');

    };

    async openAddCarPopup(){
        await this.addCarButton.click();
        return new AddCarPopup(this._page);
    }

      async getExistingCarsCount(){
        return  await this.existingCarsList.count();

    }



}
