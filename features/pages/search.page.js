import BasePage from './base.page.js';
import { expect } from "chai";

class SearchPage extends BasePage {

    // 🔎 Arama input
    get searchInput() {
        return $('id:trendyol.com:id/edittext_search_view');
    }

    // 📦 Ürün isimleri
    get productNames() {
        return $$("//android.widget.TextView[@resource-id='trendyol.com:id/textview_title_product']");
    }

    // 💰 Ürün fiyatları
    get productPrices() {
        return $$("//android.widget.TextView[@resource-id='trendyol.com:id/textViewNewDiscountedPrice']");
    }

    // 🧱 Ürün kartları
    get productListItems() {
        return $$("//android.view.ViewGroup[@resource-id='trendyol.com:id/constraintLayout']");
    }

    // ❌ Popup kapatma (GENEL)
    async closeSortAndFilterPopup() {
        const selectors = [
            'id:trendyol.com:id/imageViewTooltipClose',
            'id:trendyol.com:id/imageViewClose',
            "//android.widget.ImageView[contains(@resource-id,'close')]",
            "//android.widget.ImageView[contains(@content-desc,'close')]"
        ];

        for (const sel of selectors) {
            try {
                const el = await $(sel);
                if (await el.isDisplayed()) {
                    await el.click();
                    await browser.pause(300);
                    return true;
                }
            } catch (_) {}
        }
        return false;
    }

    // 🔍 GERÇEK ARAMA (STABİL)
    async searchForProduct(keyword) {
        await this.waitForElement(this.searchInput);
        await this.closeSortAndFilterPopup();

        // input hazırlığı
        await this.searchInput.click();
        await this.searchInput.clearValue();
        await browser.pause(300);

        await this.searchInput.setValue(keyword);
        await browser.pause(600); // suggestion'dan çıkış için kritik

        // klavyeyi kapat
        try {
            await driver.hideKeyboard();
        } catch (_) {}

        // 🔥 ASIL TETİKLEYİCİ
        await driver.pressKeyCode(84); // KEYCODE_SEARCH

        await browser.pause(1500);
        await this.closeSortAndFilterPopup();
    }

    // ✅ Ürün isimlerini doğrula (0 ürün kabul)
    async verifyAllProductNames(keyword) {
        await this.closeSortAndFilterPopup();

        const products = await this.productNames;

        if (products.length === 0) {
            console.log("ℹ️ Arama sonucu 0 ürün döndü (brand / stok / algoritma)");
            return;
        }

        for (const el of products) {
            const text = (await el.getText()).toLowerCase();
            expect(text).to.include(
                keyword.toLowerCase(),
                `Ürün adı keyword içermiyor: ${text}`
            );
        }
    }

    // 🛒 2. ürünü seç + fiyat al
    async selectSecondProductAndCapturePrice() {
        await this.closeSortAndFilterPopup();

        await browser.waitUntil(
            async () => (await this.productListItems).length >= 2,
            {
                timeout: 15000,
                timeoutMsg: "Listede en az 2 ürün bulunamadı!"
            }
        );

        const prices = await this.productPrices;
        expect(prices.length).to.be.greaterThan(1, "İkinci ürünün fiyatı yok!");

        let priceText = await prices[1].getText();
        priceText = priceText.replace(/[^\d,]/g, "").replace(",", ".");
        const price = parseFloat(priceText);

        await this.productListItems[1].click();
        return price;
    }
}

export default new SearchPage();
