import { test, expect } from '@playwright/test';

const sauceDemo = 'https://www.saucedemo.com/'

test('has title', async ({ page }) => {
    await page.goto(sauceDemo)

    await expect(page).toHaveTitle('Swag Labs')
})

test('login success', async ({ page }) => {
    await page.goto(sauceDemo)

    await page.getByPlaceholder('Username').fill('standard_user')

    await page.getByPlaceholder('Password').fill('secret_sauce')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(`${sauceDemo}inventory.html`)
})

test('login failed', async ({ page }) => {
    await page.goto(sauceDemo)

    await page.getByPlaceholder('Username').fill('standard_user')

    await page.getByPlaceholder('Password').fill('wrong.kd-pass')

    await page.getByRole('button', { name: 'Login' }).click()

    // await expect(page).not.toHaveURL(`${sauceDemo}inventory.html`)

    await expect(page.getByRole('heading',
        { name: 'Username and password do not match' })).toBeVisible()
})

test('locked out user', async ({ page }) => {
    await page.goto(sauceDemo)

    await page.getByPlaceholder('Username').fill('locked_out_user')

    await page.getByPlaceholder('Password').fill('secret_sauce')

    await page.getByRole('button', { name: 'Login' }).click()

    // console.log(await page.getByRole('heading',
    //     { name: 'Sorry, this user has been locked out' }).textContent())

    await expect(page.getByRole('heading',
        { name: 'Sorry, this user has been locked out' })).toBeVisible()
})