import { test, expect } from '@playwright/test'
import * as auth from './pages/LoginPOM'
import * as cart from './pages/CartPOM'

test('add item to cart', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    const cartBadge = await cart.addItem(page)

    // console.log(await page.getByTestId('shopping-cart-badge').textContent())

    await expect(cartBadge).toContainText('1')
})

test('remove item from cart', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    await cart.addItem(page)
    const cartBadge = await cart.removeItem(page)
    await expect(cartBadge).toBeHidden()
})

test('item info visible and not empty', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    const { itemTitle, itemPrice, itemDesc } = await cart.itemInfoVisible(page)

    await expect(itemTitle).toBeVisible()
    await expect(itemTitle).not.toBeEmpty()
    await expect(itemPrice).toBeVisible()
    await expect(itemPrice).not.toBeEmpty()
    await expect(itemDesc).toBeVisible()
    await expect(itemDesc).not.toBeEmpty()
})

test('cart checkout', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    await cart.addItem(page)
    const { pageUrl, thankYou } = await cart.cartCheckout(page, 'John', 'Garcin', '23XT2E')

    await expect(pageUrl).toBe('https://www.saucedemo.com/checkout-complete.html')
    await expect(thankYou).toBeVisible()
})