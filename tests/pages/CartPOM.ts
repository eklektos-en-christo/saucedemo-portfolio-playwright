import { type Page } from "@playwright/test";

export async function addItem(page: Page) {
    await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
    const cartBadge = page.getByTestId("shopping-cart-badge");
    return cartBadge;
}

export async function removeItem(page: Page) {
    await page.getByTestId("shopping-cart-badge").click();
    await page.getByRole("button", { name: "Remove" }).click();
    return page.getByTestId("shopping-cart-badge");
}

export async function itemInfoVisible(page: Page) {
    await page.getByTestId("inventory-item-name").nth(2).click();
    return {
        itemTitle: page.getByTestId("inventory-item-name"),
        itemPrice: page.getByTestId("inventory-item-price"),
        itemDesc: page.getByTestId("inventory-item-desc"),
    };
}

export async function getFillInfo(
    page: Page,
    firstName: string,
    lastName: string,
    postalCode: string,
) {
    await page.getByTestId("firstName").fill(firstName);
    await page.getByTestId("lastName").fill(lastName);
    await page.getByTestId("postalCode").fill(postalCode);
}

export async function cartCheckout(
    page: Page,
    firstName: string,
    lastName: string,
    postalCode: string,
) {
    await page.getByTestId("shopping-cart-badge").click();
    await page.getByRole("button", { name: "checkout" }).click();
    await getFillInfo(page, firstName, lastName, postalCode);
    await page.getByRole("button", { name: "continue" }).click();
    await page.getByText("All Rights Reserved.").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Finish" }).click();

    return {
        pageUrl: page.url(),
        thankYou: await page.getByText("Thank you for your order!", {
            exact: true,
        }),
    };
}
