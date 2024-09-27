import { Page, Locator } from '@playwright/test';

export class AdminPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private productsMenu: Locator;
    private productUploadPageLink: Locator;
    private productEmbeddingsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('//input[@name="username"]');
        this.passwordInput = page.locator('//input[@name="password"]');
        this.loginButton = page.locator('//button[@type="submit"]');
        this.productsMenu = page.locator('//a[text()="Products"]');
        this.productUploadPageLink = page.locator('//a[text()="Product CSV Upload"]');
        this.productEmbeddingsLink = page.locator('//a[text()="Product Embeddings"]');
    }

    async navigateToAdminLogin(): Promise<void> {
        await this.page.goto('https://chatapi.olssonparts.calcey.com/admin/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState(); // Wait for the page to load
    }
    async navigateToProductUploadPage(): Promise<void> {
        await this.productsMenu.click();
        await this.productUploadPageLink.click();
        await this.page.waitForLoadState();
    }

    async navigateToProductEmbeddingsPage(): Promise<void> {
        await this.productsMenu.click();
        await this.productEmbeddingsLink.click();
        await this.page.waitForLoadState();
    }


}