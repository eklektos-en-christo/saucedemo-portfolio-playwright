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

    const itemTitle = page.getByTestId('inventory-item-name')
    const itemPrice = page.getByTestId('inventory-item-price')
    const itemDesc = page.getByTestId('inventory-item-desc')

    await expect(itemTitle).toBeVisible()
    await expect(itemTitle).not.toBeEmpty()
    await expect(itemPrice).toBeVisible()
    await expect(itemPrice).not.toBeEmpty()
    await expect(itemDesc).toBeVisible()
    await expect(itemDesc).not.toBeEmpty()
})

test('checkout', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).nth(3).click()
    await page.getByTestId('shopping-cart-badge').click()
    await page.getByRole('button', { name: 'checkout' }).click()
    await page.getByTestId('firstName').fill('John')
    await page.getByTestId('lastName').fill('Garcin')
    await page.getByTestId('postalCode').fill('32523')
    await page.getByRole('button', { name: 'continue' }).click()

    await page.getByText('All Rights Reserved.').scrollIntoViewIfNeeded()

    await page.getByTestId('finish').click()

    await expect(page).toHaveURL(`${baseURL}checkout-complete.html`)
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible()
})