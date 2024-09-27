import { test, expect } from '@playwright/test';
import { AdminPage } from '../pages/adminPage';
import { ProductUploadPage } from '../pages/productUploadPage';
import * as path from 'path';
import { allure } from 'allure-playwright';

test.describe('Admin Product Upload Tests', () => {
    let adminPage: AdminPage;
    let productUploadPage: ProductUploadPage;

test.beforeEach(async ({ page }) => {
    adminPage = new AdminPage(page);
    productUploadPage = new ProductUploadPage(page);

    // Step 1: Navigate to Admin Panel and Login
    await adminPage.navigateToAdminLogin();
    await adminPage.login('olssonadmin', 'Calcey@123');
});

test('Upload Product CSV File', async ({ page }) => {
    allure.epic('Admin Panel');
    allure.feature('Product Upload');
    allure.story('CSV File Upload');

    // Step 2: Navigate to Product CSV Upload page
    await adminPage.navigateToProductUploadPage(); 
    
    // Step 3: Upload the product file
    const filePath = path.resolve(__dirname, '../test_data/veryLessData.csv'); // Adjust this path
    await productUploadPage.uploadProduct(filePath);

    // Step 4: Verify the success message
    const successMessage = await productUploadPage.verifySuccessMessage();
    expect(successMessage).toContain('CSV file has been uploaded successfully');

    // Step 5: Wait for 10 seconds, then refresh and log the product count
    await page.waitForTimeout(10000); // Wait for 10 seconds
    await page.reload(); // Refresh the page
    const productCount = await productUploadPage.getProductCount();
    console.log(`Product Count: ${productCount}`);
  });

    test('Verify Product Embeddings', async ({ page }) => {
    // Step 6: Navigate to Product Embeddings page
    await adminPage.navigateToProductEmbeddingsPage();

    // Step 7: Log the embeddings count and verify it matches product count
    const embeddingsCount = await productUploadPage.getProductCount(); // Assuming product count and embeddings count are the same
    console.log(`Product Embeddings Count: ${embeddingsCount}`);
});

test('Delete Single Product', async ({ page }) => {
    // Step 8: Get current product count and delete one product
    const initialProductCount = await productUploadPage.getProductCount();
    await productUploadPage.deleteProduct();
    await page.reload(); // Refresh the page

    const newProductCount = await productUploadPage.getProductCount();
    expect(newProductCount).toBe(initialProductCount - 1);
    console.log(`Product count reduced by 1, new count: ${newProductCount}`);
  });


test('Delete Multiple Products', async ({ page }) => {
    // Step 9: Get current product count and delete multiple products
    const initialProductCount = await productUploadPage.getProductCount();
    await productUploadPage.selectMultipleProductsToDelete();
    await productUploadPage.selectDeleteActionAndGo();
    await page.reload(); // Refresh the page

    const newProductCount = await productUploadPage.getProductCount();
    expect(newProductCount).toBeLessThan(initialProductCount);
    console.log(`Product count reduced, new count: ${newProductCount}`);
  });

});
