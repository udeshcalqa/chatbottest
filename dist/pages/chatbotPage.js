"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotPage = void 0;
class ChatbotPage {
    constructor(page) {
        // Locators
        this.chatbotIcon = '//button[@class="floating-button"][contains(.,"icon")]';
        this.chatInput = '//textarea[@placeholder="Ask a question"]';
        this.sendButton = '//button[@class="action-link send-button"]';
        this.chatbotResponse = '//div[contains(@class, "message response")][last()]';
        this.page = page;
    }
    // Open chatbot
    openChatbot() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.click(this.chatbotIcon);
        });
    }
    // Send a message
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.fill(this.chatInput, message);
            yield this.page.click(this.sendButton);
        });
    }
    // Validate chatbot response
    getLatestResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.textContent(this.chatbotResponse);
        });
    }
}
exports.ChatbotPage = ChatbotPage;
