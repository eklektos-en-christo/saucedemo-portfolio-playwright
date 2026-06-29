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

