import { type Page } from '@playwright/test'

export async function getInventoryLocators(page: Page) {
    return {
        cartIcon: page.getByTestId('shopping-cart-link'),
        inventoryItems: page.getByTestId('inventory-item'),
        hamburgerButton: page.getByRole('button', { name: 'Open Menu' }),
        header: page.getByTestId('primary-header'),
        footer: page.getByTestId('footer')
    }
}