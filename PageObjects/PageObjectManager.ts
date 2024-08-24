import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { InventoryPage } from "./InventoryPage";
import {LoginPage} from "./LoginPage"
import { Page } from "@playwright/test"


export class PageObjectManager{

    page:Page
    loginpage:LoginPage;
    inventorypage:InventoryPage;
    cartpage:CartPage;
    checkoutpage:CheckoutPage;
    
    constructor(page:Page)
    {
        this.page=page;
        this.loginpage = new LoginPage(page);
        this.inventorypage = new InventoryPage(page);
        this.cartpage = new CartPage(page);
        this.checkoutpage = new CheckoutPage(page);
        
    }

    GetLoginPage()
    {
        return this.loginpage;
    }

    GetInventoryPage()
    {
        return this.inventorypage;
    }

    GetCartPage()
    {
        return this.cartpage;
    }

    GetCheckoutPage()
    {
        return this.checkoutpage;
    }

}

module.exports={PageObjectManager}