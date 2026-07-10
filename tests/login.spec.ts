import { test, expect } from '@playwright/test';
import * as auth from './pages/LoginPOM'

const baseURL = 'https://www.saucedemo.com/'

test('has title', async ({ page }) => {
    await auth.goto(page)
    await expect(page).toHaveTitle('Swag Labs')
})

test('login success', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

test('login failed', async ({ page }) => {
    await auth.login(page, 'standard_user', 'wrongpasswd')
    await expect(page.getByRole('heading',
        { name: 'Username and password do not match' })).toBeVisible()
})

test('locked out user', async ({ page }) => {
    await auth.login(page, 'locked_out_user', 'secret_sauce')

    // console.log(await page.getByRole('heading',
    //     { name: 'Sorry, this user has been locked out' }).textContent())

    await expect(page.getByRole('heading',
        { name: 'Sorry, this user has been locked out' })).toBeVisible()
})

test('empty fields login', async ({ page }) => {
    await auth.login(page, '', '')

    // console.log(await page.getByRole('heading',
    //     { name: 'Username is required' }).textContent())

    await expect(page.getByRole('heading',
        { name: 'Username is required' })).toBeVisible()
})

test('empty password field', async ({ page }) => {
    await auth.login(page, 'standard_user', '')

    // console.log(await page.getByRole('heading',
    //     { name: 'Password is required' }).textContent())

    await expect(page.getByRole('heading',
        { name: 'Password is required' })).toBeVisible()
})