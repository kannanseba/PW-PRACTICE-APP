import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})
//---------------------------------------------------
test.describe('Suite - 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })
    test('Navigate to the form layout page', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })
    test('Navigate to the datepicker page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})
//--------------------------------------------------
test.describe('Suite 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
    })
    test('Navigate to the Dialog page', async ({ page }) => {
        await page.getByText('Dialog').click()
    })
    test('Navigate to the Window page', async ({ page }) => {
        await page.getByText('Window').click()
    })
})

// Hi Kannan
// How are you?