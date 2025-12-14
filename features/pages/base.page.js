export default class BasePage {
    async waitForElement(element) {
        await element.waitForDisplayed({ timeout: 10000 });
    }

    // Uygulama içinde aşağı kaydırma (scroll down) fonksiyonu
    async scrollDown(x = 500, startY = 800, endY = 200, duration = 1000) {
        await driver.touchPerform([
            { action: 'press', options: { x: x, y: startY } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: x, y: endY } },
            { action: 'release' }
        ]);
    }

    // Uygulama içinde yukarı kaydırma (scroll up) fonksiyonu
    async scrollUp(x = 500, startY = 200, endY = 800, duration = 1000) {
        await driver.touchPerform([
            { action: 'press', options: { x: x, y: startY } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: x, y: endY } },
            { action: 'release' }
        ]);
    }

    async elementExists(element) {
        try {
            await element.waitForExist({ timeout: 3000 }); 
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }
}