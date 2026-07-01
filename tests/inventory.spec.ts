import { test, expect } from '@playwright/test';
import * as auth from '../tests/pages/LoginPOM'
import * as products from '../tests/pages/InventoryPOM'

test('common elements visible', async ({ page }) => {
    await auth.login(page, 'standard_user', 'secret_sauce')
    const { cartIcon, inventoryItems, hamburgerButton, header, footer } = await products.getInventoryLocators(page)

    await page.screenshot({ path: './screenshots/cart_icon.png', 'fullPage': true })

    await expect(cartIcon).toBeVisible()
    await expect(await inventoryItems.count()).toEqual(6)
    await expect(hamburgerButton).toBeVisible()
    await expect(header).toBeVisible()
    await expect(footer).toBeVisible()
})