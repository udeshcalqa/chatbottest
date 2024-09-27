"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const test_1 = require("@playwright/test");
const chatbotPage_1 = require("../pages/chatbotPage");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Utility to read a random line from a file
function getRandomLine(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const randomIndex = Math.floor(Math.random() * lines.length);
    return lines[randomIndex];
}
test_1.test.describe('Chatbot Tests', () => {
    (0, test_1.test)('Test Greeting and Test Utterance', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const chatbotPage = new chatbotPage_1.ChatbotPage(page);
        // Navigate to the chatbot application
        yield page.goto('https://cms.olssonparts.calcey.com');
        // Step 2: Open chatbot
        yield chatbotPage.openChatbot();
        // Step 3: Send greeting
        const greeting = getRandomLine(path.resolve(__dirname, '../../test-data/greetings.txt'));
        yield chatbotPage.sendMessage(greeting);
        console.log(`Test Greeting Message: ${greeting}`);
        // Step 4: Validate response for greeting
        const greetingResponse = yield chatbotPage.getLatestResponse();
        console.log(`Chatbot Response: ${greetingResponse}`);
        (0, test_1.expect)(greetingResponse).not.toContain("I'm sorry, something went wrong. Please try again in a little while.");
        // Step 5: Send test utterance
        const utterance = getRandomLine(path.resolve(__dirname, '../../test-data/utterances.txt'));
        yield chatbotPage.sendMessage(utterance);
        console.log(`Test Utterance: ${utterance}`);
        // Step 6: Validate response for test utterance
        const utteranceResponse = yield chatbotPage.getLatestResponse();
        console.log(`Chatbot Response: ${utteranceResponse}`);
        (0, test_1.expect)(utteranceResponse).not.toContain("I'm sorry, something went wrong. Please try again in a little while.");
    }));
});
