import { test, expect } from '@playwright/test'
import * as auth from './pages/LoginPOM'
import * as cart from './pages/CartPOM'
import * as checkout from './pages/CheckoutPOM'

test('empty fields', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    await cart.addItem(page)
    const errorMessage = await checkout.emptyFields(page)

    // console.log(await page.getByRole('heading').allTextContents())

    await expect(errorMessage).toBeVisible()
})

test('last name, postal code empty', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    await cart.addItem(page)
    const errorMessage = await checkout.lastNamePostalEmpty(page)

    await expect(errorMessage).toBeVisible()
})

test('postal code empty', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    await cart.addItem(page)
    const errorMessage = await checkout.postalEmpty(page)

    await expect(errorMessage).toBeVisible()
})
