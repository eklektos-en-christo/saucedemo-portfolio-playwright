import { test, expect, defineConfig } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com/'

test.beforeEach('logged in...', async ({ page }) => {
    await page.goto(baseURL)
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
})

test('common elements visible', async ({ page }) => {
    await page.screenshot({ path: './screenshots/cart_icon.png', 'fullPage': true })

    const cartIcon = page.getByTestId('shopping-cart-link')
    const inventoryItems = page.getByTestId('inventory-item').all()
    const hamburgerButton = page.getByRole('button', { name: 'Open Menu' })
    const header = page.getByTestId('primary-header')
    const footer = page.getByTestId('footer')

    await expect(cartIcon).toBeVisible()
    await expect((await inventoryItems).length).toEqual(6)
    await expect(hamburgerButton).toBeVisible()
    await expect(header).toBeVisible()
    await expect(footer).toBeVisible()
})