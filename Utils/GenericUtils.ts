import { Locator } from "@playwright/test";


export async function Enter_Values(locator:Locator, value:string)
{
    await locator.fill(value);

}

export function Price_Extractor(priceText: string | null): number {
    if (priceText === null) {
        throw new Error("Price text is null");
    }
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
    return price;
}

module.exports={
    Enter_Values,
    Price_Extractor
}