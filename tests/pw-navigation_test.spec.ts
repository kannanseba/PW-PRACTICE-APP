import { test, expect } from "@playwright/test";
import NavigationPage from "../page-objects/pw-navigation_POM";


test.beforeEach("Navigate to the Pw-Test Url page ", async ({ page }) => {
    await page.goto("http://localhost:4200/")
})
//dd

test('Navigate to formLayout Page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formsLayoutPage()
    await navigateTo.checkBoxes()
    await navigateTo.smartTablePage()
    await navigateTo.tooltipPage()

});