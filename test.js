const { Builder, By, until, Select } = require('selenium-webdriver');
const assert = require("assert");

const credentials = [
  {
    firstName: 'abebe',
    lastName: 'beso',
    phone: '+251909878760',
    password: '@Password123',
    confirmPassword: '@Password123',
    businessType: 'Agency',
    email: 'john.doe@example.com',
    address: '123 Main St, City, Country'
  },
  {
    firstName: 'chala',
    lastName: 'chube',
    phone: '+251909878715',
    password: '@Qwerty987',
    confirmPassword: '@Qwerty987',
    businessType: 'Others',
    email: 'alice.smith@example.com',
    address: '456 Elm St, Town, Country'
  },
  // Add more sets of data as needed
];

describe('Testing DaguSMS:', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  afterEach(async () => {
    console.log('This will be executed after each test');
    await driver.quit();
  });

  credentials.forEach((credential, index) => {
    it(`login test - Combination ${index + 1}`, async () => {
      try {
        await driver.get('https://dagusms.com/auth/register');

        const firstNameInput = await driver.findElement(By.css('input[placeholder="Name"]'));
        await firstNameInput.sendKeys(credential.firstName);

        const lastNameInput = await driver.findElement(By.css('input[placeholder="Last Name"]'));
        await lastNameInput.sendKeys(credential.lastName);

        const phoneInput = await driver.findElement(By.css('input[placeholder="Phone Number"]'));
        await phoneInput.sendKeys(credential.phone);

        const passwordInput = await driver.findElement(By.css('input[placeholder="Password"]'));
        await passwordInput.sendKeys(credential.password);

        const confirmPasswordInput = await driver.findElement(By.css('input[placeholder="Confirm password"]'));
        await confirmPasswordInput.sendKeys(credential.confirmPassword);

        const emailInput = await driver.findElement(By.css('input[placeholder="your@email.com"]'));
        await emailInput.sendKeys(credential.email);

        // Find the dropdown element based on its placeholder attribute
        const dropdown = await driver.findElement(By.css('input[placeholder="Select Business Type"]')).click();
        let val = await driver.findElement(By.css('div.m-92253aa5.mantine-Select-option[value="Agency"]'));
        await val.click()
        // Use Selenium's Select class to interact with dropdowns

        // Select the option by its visible text

        const addressInput = await driver.findElement(By.css('input[placeholder="Address"]'));
        await addressInput.sendKeys(credential.address);

        // Adjust this part to select the dropdown option based on the credential.businessType

        const registerButton = await driver.findElement(By.css('.m-811560b9.mantine-Button-label'));
        await registerButton.click();

        const dashboardLink = await driver.wait(until.elementLocated(By.css('.login_title__8rjXh.m-8a5d1357.mantine-Title-root')), 10000);
        const result = await dashboardLink.getAttribute('innerText');

        assert.strictEqual(result, "Verify Your OTP", `Login was not successful for ${credential.firstName}`);
      } catch (error) {
        console.error(`Error in test for combination ${index + 1}:`, error);
        throw error;
      }
    });
  });
});
