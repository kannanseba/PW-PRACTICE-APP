import { test, expect } from "@playwright/test";

test.describe("Suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://uitestingplayground.com/ajax/");
    await page.locator("#ajaxButton").click();
  });

  test("Auto waits ", async ({ page }) => {
    const textwait = page.locator(".bg-success");
    // await textwait.click();

    // method 1
    // const text = await textwait.textContent(); // textContent() is automatically  waits for the elements.
    // console.log("The text is: " + text);
    // expect(text).toEqual("Data loaded with AJAX get request.");

    //Method 2
    // await textwait.waitFor({ state: "attached" });
    // const text = await textwait.allTextContents(); // allTextContents() we have to follow another method to wait for the element.
    // expect(text).toContain("Data loaded with AJAX get request.");

    // Alternative Method for Method 2
    // await page.waitForSelector(".bg-success");
    // const text = await textwait.allTextContents(); // allTextContents() we have to follow another method to wait for the element.
    // expect(text).toContain("Data loaded with AJAX get request.");

    // WaitforResponse - waitForURL - WaitforTimeout...
  });
  test("Timeout", async ({ page }) => {
    //test.setTimeout(60*1000); // Set timeout for a specific test case
    // test.slow(); // Playwright will  increase the timeout for this test twice the default timeout.
  });
});
