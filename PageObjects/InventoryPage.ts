import {test, expect, Page, Locator} from "@playwright/test"
import { Enter_Values } from "../Utils/GenericUtils"

export class InventoryPage{

    page:Page;
    products:Locator;
    cart:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.products=page.locator("div[class='inventory_item']");
        this.cart=page.locator("a[class='shopping_cart_link']");
        
    }

    async Add_Product_Cart(Prodname:string)
    {
       await this.products.filter({hasText: Prodname}).getByRole("button").click();
    }

    async Navigate_Cart()
    {
        await this.cart.click();
    }

}
module.exports={InventoryPage}