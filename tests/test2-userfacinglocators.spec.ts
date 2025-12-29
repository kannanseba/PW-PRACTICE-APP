import { test, expect } from "@playwright/test";

test.describe("Suite Name : Locators", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("Using User-Facing Locators to navigate to Form Layouts page", async ({
    page,
  }) => {
    // TextBox selection :
    await page.getByRole("textbox", { name: "Email" }).first().click();
    await page.getByRole("button", { name: "Sign in" }).first().click();
    await page.getByLabel("Email").first().click();
    await page.getByPlaceholder("Jane Doe").click();
    // await page.getByText("Using the Grid").click();
    // await page.getByTitle("IoT Dashboard").click();
    // await page.getByTestId("Sign in").click();
  });

  // Child Locator selection commands and methods :

  test("Using child locators to navigate the form layouts page", async ({
    page,
  }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').first().click();
    await page.locator("nb-card nb-radio").getByText("Option 2").click();
    await page.locator("nb-card").getByRole("button", { name: "Sign in" }).first().click();
    await page
      .locator("nb-card")
      .nth(4)
      .getByRole("button", { name: "submit" })
      .click();
  });

  // Using parent locators to navigate the specific web elements :
  test("Using parent locators to navigate the specific web elements", async ({
    page,
  }) => {
    // method 1
    await page
      .locator("nb-card", { hasText: "Block form" })
      .getByRole("textbox", { name: "Email" })
      .click();
    // method 2
    await page
      .locator("nb-card", { has: page.locator("#exampleInputPassword1") })
      .getByRole("textbox", { name: "Password" })
      .click();

    // -> Another Type (Using(.filter command)): method 1
    await page
      .locator("nb-card")
      .filter({ hasText: "Form without labels" })
      .getByRole("textbox", { name: "Recipients" })
      .click();
    // method 2 - using filter command :
    await page
      .locator("nb-card")
      .filter({ has: page.locator("#inputEmail1") })
      .getByRole("textbox", { name: "Email" })
      .click();

    // Nvaigate to the specific function form : Ex > checkbox>sign in button>click
    await page
      .locator("nb-card")
      .filter({ has: page.locator("nb-checkbox") })
      .filter({ hasText: "Sign in" })
      .getByRole("textbox", { name: "Email" })
      .click();

    // Special or Advance method to navigate the specific web elements : Using .. to go to the parent element
    await page
      .locator("nb-card")
      .filter({ hasText: "Using the Grid" })
      .locator("..")
      .getByRole("button", { name: "Sign in" })
      .click();
  });

  test("Reusing Locators", async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const emailTextBox = basicForm.getByRole("textbox", { name: "Email" });
    const passwordTextBox = basicForm.getByRole("textbox", {
      name: "Password",
    });

    await emailTextBox.fill("kannan@gmail.com");
    await passwordTextBox.fill("kannan123");
    await basicForm.locator("nb-checkbox").click();
    await basicForm.getByRole("button", { name: "Submit" }).click();
    await expect(emailTextBox).toHaveValue("kannan@gmail.com");
  });
  test("Extracting values - Commands types", async ({ page }) => {
    // Validate all text contents of the checkbox options:
    const checkBoxText = await page
      .locator("nb-card")
      .locator("nb-radio")
      .allTextContents();
    console.log("The checkbox texts are : " + checkBoxText);
    expect(checkBoxText.length).toBe(3);
    expect(checkBoxText).toContain("Option 2");

    // Single Test value extraction :
    const firstCheckBoxText = await page
      .locator("nb-card")
      .locator("nb-radio")
      .first()
      .textContent();
    console.log("The first checkbox text is : " + firstCheckBoxText);
    expect(firstCheckBoxText).toBe("Option 1");

    const BasicForm = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("button");
    const buttonText = await BasicForm.textContent();
    expect(buttonText).toBe("Submit"); // You can use toEqual also and toHaveText also

    // Input value extraction :
    const emailField = page
      .locator("nb-card")
      .filter({ hasText: "Form without labels" })
      .getByRole("textbox", { name: "Recipients" });
    await emailField.fill("kannanSebastin");
    const emailInputValue = await emailField.inputValue();
    expect(emailInputValue).toEqual("kannanSebastin");

    const placeholder = page
      .locator("nb-card")
      .getByRole("textbox", { name: "Recipients" });
    const placeHoldername = await placeholder.getAttribute("placeholder");
    expect(placeHoldername).toBe("Recipients");
  });

  test.only("Assertions", async ({ page }) => {
    // General Assertions :
    const button = page
      .locator("nb-card")
      .filter({ hasText: "Horizontal form" })
      .locator("button");
    const text = await button.textContent();
    expect(text).toEqual("Sign in");

    // Locator Assertions :
    await expect(button).toHaveText("Sign in");

    // soft Assertions : It is used to continue the test execution even after the failure of the assertion
    await expect.soft(button).toHaveText("Sign in"); //toHaveText("Sign in555")
    await button.click();
  });
});
