import { test, expect } from '@playwright/test';
import { ChatbotPage } from '../pages/chatbotPage';
import * as fs from 'fs';

test.describe('Chatbot Response Test', () => {
  let chatbotPage: ChatbotPage;
  let testUtterances: string[];
  let testGreeting: string[];

  // Read test utterances from file before running tests
  test.beforeAll(() => {
    testGreeting = fs.readFileSync('test_data/greetings.txt', 'utf-8').split('\n');
    testUtterances = fs.readFileSync('test_data/utterances.txt', 'utf-8').split('\n');
  });

  test.beforeEach(async ({ page }) => {
    chatbotPage = new ChatbotPage(page);
    await chatbotPage.navigate();
  });

  test('Verify chatbot responds without error message', async ({ page }) => {
    const randomGreeting = testGreeting[Math.floor(Math.random() * testGreeting.length)];
    const randomUtterance = testUtterances[Math.floor(Math.random() * testUtterances.length)];

    await chatbotPage.openChatbot();

    // Send the greeting message
    await chatbotPage.sendMessage(randomGreeting);

    // Start the timer before sending the message
    const startTimeGreeting = Date.now();

    // Wait for the latest response to appear
    const latestResponseLocatorGreeting = page.locator("(//div[contains(@class, 'message response')])[last()]");

    await latestResponseLocatorGreeting.waitFor({ state: 'attached' });

    // Wait until the element contains non-empty text content
    await page.waitForFunction(
      (element: HTMLElement | SVGElement | null) => element != null && element.textContent != null && element.textContent.trim().length > 0,
      await latestResponseLocatorGreeting.elementHandle()
    );

    const responseTextGreeting = await latestResponseLocatorGreeting.textContent();
    const responseTimeGreeting = Date.now() - startTimeGreeting;

    // Log the greeting message response
    console.log(`Test Greeting Message: ${randomGreeting}`);
    console.log(`Chatbot Response: ${responseTextGreeting ? responseTextGreeting.trim() : 'No response received'}`);
    console.log(`Response Time for the Greeting Message: ${responseTimeGreeting}ms`);

    // **Fail the test if the error message is encountered**
    if (responseTextGreeting?.includes("I'm sorry, something went wrong. Please try again in a little while.")) {
      console.error("Error: Chatbot responded with an error message after sending the greeting.");
      throw new Error('The chatbot returned an error message: "I\'m sorry, something went wrong. Please try again in a little while."');
    }


    // Send the test utterance
    await chatbotPage.sendMessage(randomUtterance);

    // Start the timer before sending the message
    const startTimeUtterance = Date.now();

    // Wait for the latest response to appear
    const latestResponseLocatorUtterance = page.locator("(//div[contains(@class, 'message response')])[last()]");

    await latestResponseLocatorUtterance.waitFor({ state: 'attached' });

    // Wait until the element contains non-empty text content
    await page.waitForFunction(
      (element: HTMLElement | SVGElement | null) => element != null && element.textContent != null && element.textContent.trim().length > 0,
      await latestResponseLocatorUtterance.elementHandle()
    );

    const responseTextUtterance = await latestResponseLocatorUtterance.textContent();
    const responseTimeUtterance = Date.now() - startTimeUtterance;

    // Log the used test utterance and the received response
    console.log(`Test Prompt: ${randomUtterance}`);
    console.log(`Chatbot Response: ${responseTextUtterance ? responseTextUtterance.trim() : 'No response received'}`);
    console.log(`Response Time: ${responseTimeUtterance}ms`);

    // **Fail the test if the error message is encountered**
    if (responseTextUtterance?.includes("I'm sorry, something went wrong. Please try again in a little while.")) {
      console.error("Error: Chatbot responded with an error message after sending the greeting.");
      throw new Error('The chatbot returned an error message: "I\'m sorry, something went wrong. Please try again in a little while."');
    }

    // Validate that the response doesn't contain the error message
   // expect(responseTextGreeting && responseTextUtterance).not.toContain("I'm sorry, something went wrong. Please try again in a little while.");
  });
});
