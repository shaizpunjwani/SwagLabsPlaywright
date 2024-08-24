import {test, expect, Page, Locator} from "@playwright/test"
import { Enter_Values } from "../Utils/GenericUtils"

export class CartPage{

    page:Page;
    prodcount:Locator;
    checkout:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.prodcount=page.locator("div[class='cart_item']");
        this.checkout=page.getByRole("button", {name: "checkout"});
        
    }

    async Verify_Added_Products(prods:number)
    {
        const count = await this.prodcount.count();
        expect(count).toBe(prods);
    }

    async Navigate_Checkout()
    {
        this.checkout.click();
    }



}
module.exports={CartPage}