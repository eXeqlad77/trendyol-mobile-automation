
import BasePage from './base.page.js';

class HomePage extends BasePage {

    get searchBox() {
        return $('//*[@resource-id="trendyol.com:id/edittext_search_view"]');
    }

    get genderCloseBtn() {
        return $('//*[@resource-id="trendyol.com:id/buttonDismiss"]');
    }

    get notificationCloseBtn() {
        return $('//*[@resource-id="trendyol.com:id/imageButtonClose"]');
    }

    get categoryTooltipClose() {
        return $('//*[@resource-id="trendyol.com:id/imageViewTooltipClose"]');
    }

    // 20saniye animasyonu bekleme
    async waitForAnimationToFinish() {
        await driver.pause(20000);   
    }

    async closeAllPopups() {

        if (await this.genderCloseBtn.isDisplayed().catch(() => false)) {
            await this.genderCloseBtn.click();
            await driver.pause(300);
        }

        if (await this.notificationCloseBtn.isDisplayed().catch(() => false)) {
            await this.notificationCloseBtn.click();
            await driver.pause(300);
        }

        if (await this.categoryTooltipClose.isDisplayed().catch(() => false)) {
            await this.categoryTooltipClose.click();
            await driver.pause(300);
        }
    }

    async waitForHomeScreen() {

        await this.waitForAnimationToFinish();
        await this.closeAllPopups();

        await this.searchBox.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: "Ana ekran yüklenmedi! Arama kutusu görünmedi."
        });
    }

    async openSearchScreen() {
        await this.waitForHomeScreen();
        await this.searchBox.click();
        await driver.pause(500);
    }

}

export default new HomePage();
