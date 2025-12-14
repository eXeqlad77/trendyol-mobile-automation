import BasePage from './base.page.js';
import { expect } from 'chai';

class ProductDetailPage extends BasePage {

    //  Ürün detay sayfasındaki marka locator
    get productName() { 
        return $('id=trendyol.com:id/textViewBrandName'); 
    }

    // sepete ekle butonu Appium Inspectorden aldım
    get addToCartButton() { 
        return $('id=trendyol.com:id/primaryButton'); 
    }

    // sepetim ikonu
    get goToCartIcon() { 
        return $('id=trendyol.com:id/productDetailBasket'); 
    }

    // Ürün adı doğrulama
    async verifyProductNameContains(keyword) {
        await this.waitForElement(this.productName);
        const name = await this.productName.getText();

        expect(name.toLowerCase()).to.include(
            keyword.toLowerCase(),
            ` Ürün detay sayfasındaki isim '${name}' → '${keyword}' içermiyor!`
        );
    }

    // Sepete Ekle
    async addToCart() {
        await this.waitForElement(this.addToCartButton);
        await this.addToCartButton.click();
        console.log("✔ Ürün sepete eklendi");
    }

    // Sepete Git
    async goToCart() {
        await this.waitForElement(this.goToCartIcon, 15000);
        await this.goToCartIcon.click();
        console.log("✔ Sepet sayfasına gidildi");
    }
}

export default new ProductDetailPage();
