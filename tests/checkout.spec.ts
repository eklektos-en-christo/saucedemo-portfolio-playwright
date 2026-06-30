import { test, expect } from '@playwright/test'

const baseURL = 'https://www.saucedemo.com/'

test.beforeEach('at checkout...', async ({ page }) => {
    await page.goto(baseURL)
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('button', { name: 'Add to cart' }).nth(2).click()
    await page.getByTestId('shopping-cart-badge').click()
    await page.getByRole('button', { name: 'checkout' }).click()
})

test('Checkout form validation — empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'continue' }).click()

    // console.log(await page.getByRole('heading').allTextContents())

    await expect(page.getByRole('heading', { name: 'Error: First Name is required' })).toBeVisible()
})

test('Checkout form validation — last name, postal code empty', async ({ page }) => {
    await page.getByTestId('firstName').fill('John')
    await page.getByRole('button', { name: 'continue' }).click()

    // console.log(await page.getByRole('heading').allTextContents())

    await expect(page.getByRole('heading', { name: 'Error: Last Name is required' })).toBeVisible()
})

test('Checkout form validation — postal code empty', async ({ page }) => {
    await page.getByTestId('firstName').fill('John')
    await page.getByTestId('lastName').fill('Garcin')
    await page.getByRole('button', { name: 'continue' }).click()

    // console.log(await page.getByRole('heading').allTextContents())

    await expect(page.getByRole('heading', { name: 'Error: Postal Code is required' })).toBeVisible()
})
