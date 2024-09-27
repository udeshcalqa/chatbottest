import { Page, Locator } from '@playwright/test';

export class ChatbotPage {
  private page: Page;
  private chatbotIcon: Locator;
  private chatInput: Locator;
  private sendButton: Locator;
  private responseBox: Locator;

  // Constructor to initialize page and locators
  constructor(page: Page) {
    this.page = page;
    this.chatbotIcon = page.locator('//button[@class="floating-button"][contains(.,"icon")]');
    this.chatInput = page.locator('//textarea[@placeholder="Ask a question"]');
    this.sendButton = page.locator('//button[@class="action-link send-button"]');
    this.responseBox = page.locator('//div[contains(@class, "message response")][last()]');
  }

  async navigate(): Promise<void> {
    try {
      await this.page.goto('/');
      console.log('Successfully navigated to the base URL.');
    } catch (error) {
      console.error(`Failed to navigate to the base URL: ${error}`);
      throw new Error('The system is unable to access the base URL.');
    }
  }

  async openChatbot(): Promise<void> {
    await this.chatbotIcon.click();
  }

  async sendMessage(message: string): Promise<void> {
    await this.chatInput.fill(message);
    await this.sendButton.click();
  }

  async getResponse(): Promise<string | null> {
    return await this.responseBox.textContent();
  }
}
