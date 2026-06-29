import { test, expect } from '@playwright/test';

const sauceDemo = 'https://www.saucedemo.com/'

test('has title', async ({ page }) => {
    await page.goto(sauceDemo);

    await expect(page).toHaveTitle('Swag Labs')
})

test('login success - with right credentials', async ({ page }) => {
    await page.goto(sauceDemo);

    await page.getByPlaceholder('Username').fill('standard_user')

    await page.getByPlaceholder('Password').fill('secret_sauce')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(`${sauceDemo}inventory.html`)
})

