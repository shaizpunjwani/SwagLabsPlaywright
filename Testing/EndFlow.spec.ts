import { test, expect, Page, Locator } from "@playwright/test";
import { PageObjectManager } from '../PageObjects/PageObjectManager';
import { chromium, Browser } from 'playwright';

const Testdata = require("../Utils/Testdata.json");

let browser: Browser;
let page: Page;
let pomanager: PageObjectManager;

test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();

    pomanager = new PageObjectManager(page);
});

test.afterAll(async () => {
    await browser.close();
});

test("End to End flow testing", async () => {
    await page.goto("https://www.saucedemo.com/");
    await page.waitForLoadState("domcontentloaded");

    const loginpage = pomanager.GetLoginPage()
    await loginpage.Login("standard_user", "secret_sauce");

    const inventorypg = pomanager.GetInventoryPage();
    await inventorypg.Add_Product_Cart("Sauce Labs Bolt T-Shirt");
    await inventorypg.Navigate_Cart();

    const cartpg = pomanager.GetCartPage();
    cartpg.Verify_Added_Products(1);
    cartpg.Navigate_Checkout();

    const checkoutpg = pomanager.GetCheckoutPage();
    await checkoutpg.Add_Data(Testdata.fname, Testdata.lname, Testdata.zip);
    await checkoutpg.Navigate_Checkout();

    await checkoutpg.Assert_Price();


});
