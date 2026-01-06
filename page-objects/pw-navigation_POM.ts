import { Locator, Page } from "@playwright/test";

class NavigationPage {

    readonly page: Page
    readonly formLayoutLocator: Locator
    readonly checkBoxLocator: Locator
    readonly smartTablelocator: Locator
    readonly toolTipPagelocator: Locator

    constructor(page: Page) {
        this.page = page
        this.formLayoutLocator = page.getByText("Form Layouts")
        this.checkBoxLocator = page.getByText("Toastr")
        this.smartTablelocator = page.getByText("Smart Table")
        this.toolTipPagelocator = page.getByText("Tooltip")


    }
    async formsLayoutPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutLocator.click()
    }
    async checkBoxes() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.checkBoxLocator.click()
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTablelocator.click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toolTipPagelocator.click()
    }

    /**
     * 
     * @param groupItemTitle 
     */
    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedValue = await groupMenuItem.getAttribute("aria-expanded")

        if (expandedValue == "false") {
            await groupMenuItem.click()
        }
    }
}
export default NavigationPage;

