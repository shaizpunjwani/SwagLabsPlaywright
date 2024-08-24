import {test, expect, Page, Locator} from "@playwright/test"
import { Enter_Values, Price_Extractor } from "../Utils/GenericUtils"

export class CheckoutPage{

    page:Page;
    fname:Locator;
    lname:Locator;
    zip:Locator;
    submitbtn:Locator;
    itemprice:Locator;
    taxprice:Locator;
    totalprice:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.fname=page.locator("input[placeholder='First Name']");
        this.lname=page.locator("input[placeholder='Last Name']");
        this.zip=page.locator("input[placeholder='Zip/Postal Code']");
        this.submitbtn=page.locator("input[type='submit']");
        this.itemprice=page.locator(".summary_subtotal_label");
        this.taxprice=page.locator("div[class='summary_tax_label']");
        this.totalprice=page.locator(".summary_total_label");

        
    }

    async Add_Data(firstname:string, lastname:string, zipcode:string)
    {
        await this.fname.waitFor();
        Enter_Values(this.fname, firstname);
        await this.lname.waitFor();
        Enter_Values(this.lname, lastname);
        await this.zip.waitFor();
        Enter_Values(this.zip, zipcode);
      
    }

    async Navigate_Checkout()
    {
        this.submitbtn.click();
    }

    async Assert_Price()
    {
        const pp=await this.itemprice.textContent();
        const t = await this.taxprice.textContent();
        const total = await this.totalprice.textContent();
        
        const eachpricing=Price_Extractor(pp);
        const taxpricing=Price_Extractor(t);
        const totalpricing=Price_Extractor(total);
        expect(totalpricing).toBe(eachpricing+taxpricing);
    }
}
module.exports={CheckoutPage}