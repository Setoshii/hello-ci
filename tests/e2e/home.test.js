const { Builder, By, until } = require('selenium-webdriver');

jest.setTimeout(30000);

describe('Home Page E2E Test', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .usingServer(process.env.SELENIUM_REMOTE_URL)
            .build();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('should display the correct heading', async () => {
        await driver.get('http://jenkins:3000');

        const heading = await driver.wait(
            until.elementLocated(By.tagName('h1')),
            10000
        );

        const text = await heading.getText();

        expect(text).toBe('Hello DevOps');
    });
});