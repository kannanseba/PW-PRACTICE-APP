import { test, expect } from "@playwright/test";

test.describe("Ui-Components Documents filling", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("Filling the documents dorm", async ({ page }) => {
    const GridEmail = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
    await GridEmail.click()
    await GridEmail.fill("sebastinkanna@gmail.com")
    await GridEmail.clear()
    await GridEmail.pressSequentially("sebastinkanna@gmail.com", { delay: 500 });

    // Generic Assertion :
    const GridInputEmailValue = await GridEmail.inputValue()
    expect(GridInputEmailValue).toEqual("sebastinkanna@gmail.com")

    //Locator Assertions: 
    await expect(GridEmail).toHaveValue("sebastinkanna@gmail.com")
  });
  test("Fill - Using Grid form", async ({ page }) => {
    const GridEmail = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
    await GridEmail.fill("kannan@gmail")
    const GridPassword = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "password" })
    await GridPassword.fill("Sebastin@123")
    const GridcheckBox = page.locator("nb-card", { hasText: "Using the Grid" }).locator("nb-radio")
    await GridcheckBox.getByText("Option 1").click()
    await GridcheckBox.getByText("Option 2").click()
    const button = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("button", { name: "Sign in" })
    await button.click()

    // fill form without Labels :

    const LabRecep = page.locator("nb-card", { hasText: "Form without labels" })
    await LabRecep.getByRole("textbox", { name: "Recipients" }).fill("Kannan")
    await LabRecep.getByRole("textbox", { name: "Subject" }).fill("Playwright")
    await LabRecep.getByRole("textbox", { name: "Message" }).fill("Testing Application")
    await LabRecep.getByRole("button", { name: "Send" }).click()
  })

  test('Radio Buttons', async ({ page }) => {
    // Method 1 : Directly selecting the radio button using label concept.
    const parentLocator = page.locator("nb-card", { hasText: "Using the Grid" })
    await parentLocator.getByLabel("Option 1").check({ force: true })
    const assert = await parentLocator.getByLabel("Option 1").isChecked()
    expect(assert).toBeTruthy()
    await parentLocator.getByLabel("Option 2").check({ force: true })
    const assert2 = await parentLocator.getByLabel("Option 2").isChecked()
    expect(assert2).toBeTruthy()

    // Method 2 :getByRole
    await parentLocator.getByRole("radio", { name: "Option 1" }).check({ force: true })
    expect(await parentLocator.getByRole("radio", { name: "Option 1" }).isChecked()).toBeTruthy()
    expect(await parentLocator.getByRole("radio", { name: "Option 2" }).isChecked()).toBeFalsy()
  });

  test('CheckBoxes', async ({ page }) => {
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Toastr").click()

    // Method  1 : Nice Concept.
    const checkBox = page.getByRole("checkbox")
    for (const box of await checkBox.all()) {
      // Check the box
      await box.check({ force: true })
      expect(await box.isChecked()).toBeTruthy()
      // Uncheck the box
      await box.uncheck({ force: true })
      expect(await box.isChecked()).toBeFalsy()
    }
  });
  test("Dropdown Functionality Testing", async ({ page }) => {
    const dropdownMenu = page.locator("ngx-header nb-select")
    await dropdownMenu.click()

    page.getByRole("list")// When the list has UL tag
    page.getByRole("listitem") // When the list has LI tag

    const optionsList = page.locator("nb-option-list nb-option")
    const optionCount = await optionsList.count()
    expect(optionsList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionsList.filter({ hasText: "Cosmic" }).click()
    const header = page.locator("nb-layout-header")
    await expect(header).toHaveCSS("background-color", 'rgb(50, 50, 89)')


    // Iterating the background colours as per color list :

    const colors = {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)"
    }
    await dropdownMenu.click()
    for (const colorValue in colors) {
      await optionsList.filter({ hasText: colorValue }).click()
      await expect(header).toHaveCSS("background-color", colors[colorValue])
      if (colorValue != "Corporate")
        await dropdownMenu.click()
    }
  })

  test("Tool Tips", async ({ page }) => {
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Tooltip").click()

    const toolTip = page.locator("nb-card", { hasText: "Tooltip Placements" })
    await toolTip.getByRole("button", { name: "Top" }).hover()
    page.getByRole("tooltip")
    const toolTipText = await page.locator("nb-tooltip").textContent()

    expect(toolTipText).toEqual("This is a tooltip")
  })
  test('Dialog Boxes', async ({ page }) => {
    await page.getByText("Tables & Data").click()
    await page.getByText("Smart Table").click()
    // pop Access by Playwright :
    page.on("dialog", dialog => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?")
      dialog.accept()
    })

    await page.getByRole("table").locator("tr", { hasText: "mdo@gmail.com" }).locator(".nb-trash").click()
    await expect(page.locator("table tr").first()).not.toHaveText("mdo@gmail.com")
  });
  test('Web tables', async ({ page }) => {
    await page.getByText("Tables & Data").click()
    await page.getByText("Smart Table").click()

    // Scenario-1 : Edit the Age.
    const targetRow = page.getByRole('row', { name: "fat@yandex.ru" })
    await targetRow.locator(".nb-edit").click()

    await page.locator("input-editor").getByPlaceholder("Age").clear()
    await page.locator("input-editor").getByPlaceholder("Age").fill("25")
    await targetRow.locator(".nb-checkmark").click()


    // Scenario 2:Edit the mail as per the column data :
    await page.locator("ng2-smart-table-pager").getByText("2").click()
    const targetId = page.getByRole("row", { name: "11" }).filter({ has: page.locator("td").nth(1).getByText("11") })
    await targetId.locator(".nb-edit").click()
    await page.locator("input-editor").getByPlaceholder("E-mail").clear()
    await page.locator("input-editor").getByPlaceholder("E-mail").fill("kannan@gmail.com")
    await page.locator(".nb-checkmark").click()

    await expect(targetId.locator("td").nth(5)).toHaveText("kannan@gmail.com")
  });

});
