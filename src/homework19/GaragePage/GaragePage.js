import BasePage from "../BasePage.js";
import {SideBarMenu} from "./components/SideBarMenu.js";
import Header from "../../components/Header.js";


export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, "/panel/garage");
        this.titleGaragePage =  page.locator('h1', {hasText: 'Garage'});
    };

    async sideBarInstance() {
        return new SideBarMenu(this._page);
    }

    async presentProfile(){
       return new Header(this._page);
    }

}
