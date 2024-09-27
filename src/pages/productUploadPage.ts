import { Page, Locator } from '@playwright/test';

export class ProductUploadPage {
    private page: Page;
    private fileInput: Locator;
    private uploadButton: Locator;
    private successMessage: Locator;
    private productCount: Locator;
    private deleteButton: Locator;
    private confirmDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('//input[@type="file"]');
        this.uploadButton = page.locator('//button[text()="Upload"]');
        this.successMessage = page.locator('//div[contains(text(),"CSV file has been uploaded successfully")]');
        this.productCount = page.locator('//span[@id="product-count"]'); // Adjust this locator
        this.deleteButton = page.locator('//button[@class="delete-product"][1]'); // First product delete button
        this.confirmDeleteButton = page.locator('//button[text()="Yes"]'); // Confirmation button
    }

    async uploadProduct(filePath: string): Promise<void> {
        await this.fileInput.setInputFiles(filePath);
        await this.uploadButton.click();
    }

    async verifySuccessMessage(): Promise<string | null> {
        return await this.successMessage.textContent();
    }

    async getProductCount(): Promise<number> {
        const productCountText = await this.productCount.textContent();
        return parseInt(productCountText || '0', 10);
    }

    async deleteProduct(): Promise<void> {
        await this.deleteButton.click();
        await this.confirmDeleteButton.click();
    }

    async selectMultipleProductsToDelete(): Promise<void> {
        await this.page.locator('//input[@type="checkbox"][1]').check(); // Select multiple checkboxes
        await this.page.locator('//input[@type="checkbox"][2]').check();
    }

    async selectDeleteActionAndGo(): Promise<void> {
        await this.page.locator('//select[@name="action"]').selectOption('delete'); // Select delete from dropdown
        await this.page.locator('//button[text()="Go"]').click(); // Click "Go"
    }
}


