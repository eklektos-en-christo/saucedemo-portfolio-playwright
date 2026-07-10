import { expect, type Page } from "@playwright/test";

export async function goto(page: Page) {
    await page.goto('https://www.saucedemo.com/')
}

export async function login(page: Page, user: string, pass: string) {
    await goto(page)
    await page.getByPlaceholder('Username').fill(user)
    await page.getByPlaceholder('Password').fill(pass)
    await page.getByRole('button', { name: 'Login' }).click()
}