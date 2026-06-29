import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://saucedemo.com/');

    await expect(page).toHaveTitle('Swag Labs')
})