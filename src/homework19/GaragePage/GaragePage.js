import BasePage from "../BasePage.js";
import {SideBarMenu} from "./components/SideBarMenu.js";
import Header from "../../components/Header.js";


export default class GaragePage extends BasePage{
    constructor(page) {
        super(page, "/panel/garage");
        this.titleGaragePage =  page.locator('h1', {hasText: 'Garage'});
        this.sideBar = new SideBarMenu(this._page);
        this.header = new Header(this._page);
    };

}
