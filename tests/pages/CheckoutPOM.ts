import { type Page } from "@playwright/test";
import { getFillInfo } from "./CartPOM";

async function badgeToCheckout(page: Page) {
    await page.getByTestId('shopping-cart-badge').click()
    await page.getByRole('button', { name: 'checkout' }).click()
}

export async function emptyFields(page: Page) {
    await badgeToCheckout(page)
    await getFillInfo(page, '', '', '')
    await page.getByRole('button', { name: 'continue' }).click()
    return await page.getByRole('heading', { name: 'Error: First Name is required' })
}

export async function lastNamePostalEmpty(page: Page) {
    await badgeToCheckout(page)
    await getFillInfo(page, 'Dan', '', '')
    await page.getByRole('button', { name: 'continue' }).click()
    return await page.getByRole('heading', { name: 'Error: Last Name is required' })
}

export async function postalEmpty(page: Page) {
    await badgeToCheckout(page)
    await getFillInfo(page, 'Dan', 'Field', '')
    await page.getByRole('button', { name: 'continue' }).click()
    return await page.getByRole('heading', { name: 'Error: Postal Code is required' })
}