import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // UK Solutions projesi için doğru title'ı kontrol et
    await expect(page).toHaveTitle(/UK Solutions/)

    // Sayfa yüklendiğini kontrol et
    await expect(page).toHaveURL('http://localhost:3000/')
    
    // Sayfa içeriğinin yüklendiğini kontrol et
    const body = page.locator('body')
    await expect(body).toBeVisible()
  })
})
