import { test, expect } from '@playwright/test'

const baseURL = 'https://www.saucedemo.com/'

test.beforeEach('logged in...', async ({ page }) => {
    await page.goto(baseURL)
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
})

test('add item to cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click()

    const cartBadge = page.getByTestId('shopping-cart-badge')

    // console.log(await page.getByTestId('shopping-cart-badge').textContent())

    await expect(cartBadge).toContainText('1')
})

test('remove item from cart', async ({ page }) => {
    const cartBadge = page.getByTestId('shopping-cart-badge')

    await page.getByRole('button', { name: 'Add to cart' }).nth(1).click()
    await expect(cartBadge).toContainText('1')

    await page.getByTestId('shopping-cart-badge').click()
    await page.getByRole('button', { name: 'Remove' }).click()

    await expect(cartBadge).toBeHidden()
})

test('product info', async ({ page }) => {
    await page.getByTestId('inventory-item-name').nth(2).click()

    const itemTitle = await page.getByTestId('inventory-item-name')
    const itemPrice = await page.getByTestId('inventory-item-price')
    const itemDesc = await page.getByTestId('inventory-item-desc')

    await expect(itemTitle).toBeVisible()
    await expect(itemTitle).not.toBeEmpty()
    await expect(itemPrice).toBeVisible()
    await expect(itemPrice).not.toBeEmpty()
    await expect(itemDesc).toBeVisible()
    await expect(itemDesc).not.toBeEmpty()
})