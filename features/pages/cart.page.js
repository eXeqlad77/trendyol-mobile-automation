
import BasePage from './base.page.js';
import { expect } from 'chai';

class CartPage extends BasePage {

    //  Sepetteki ürün kartı
    get productCard() {
        return $('id=trendyol.com:id/layoutCartProduct');
    }

    //  Ürün adı
    get productNameInCart() {
        return this.productCard.$('id=trendyol.com:id/textViewBrandName');
    }

    //  Ürün fiyatı
    get productPriceInCart() {
        return this.productCard.$('id=trendyol.com:id/textViewSalePrice');
    }

    //  çöp kutusu
    get removeButton() {
        return this.productCard.$('id=trendyol.com:id/imageViewDeleteProduct');
    }

    // sil butonu popup içindeki
    get confirmDeleteButton() {
        return $('id=trendyol.com:id/textViewBasketRemoveAction');
    }

    //  BOŞ SEPET MESAJI 
    get emptyCartMessage() {
        return $('id=trendyol.com:id/textViewMessage');
    }

    

    async verifyProductName(expectedNamePart) {
        await this.waitForElement(this.productNameInCart);

        const name = await this.productNameInCart.getText();

        expect(name.toLowerCase()).to.include(
            expectedNamePart.toLowerCase(),
            `❌ Sepette görünen ürün adı '${name}' ≠ '${expectedNamePart}'`
        );
    }

    async verifyPriceMatches(expectedPrice) {
        await this.waitForElement(this.productPriceInCart);

        const priceText = await this.productPriceInCart.getText();
        const actualPrice = parseFloat(
            priceText.replace(/[^\d.,]/g, '').replace(',', '.')
        );

        expect(actualPrice).to.be.closeTo(
            expectedPrice,
            0.01,
            `❌ SEPET FİYATI YANLIŞ — Beklenen: ${expectedPrice}, Gelen: ${actualPrice}`
        );
    }

    

    async removeItemFromCart() {
        //  Karttaki çöp kutusu simgesi
        await this.waitForElement(this.removeButton);
        await this.removeButton.click();

        // Sil
        await this.waitForElement(this.confirmDeleteButton);
        await this.confirmDeleteButton.click();
    }

    // Sepet boşmu kontrol

    async verifyCartIsEmpty() {
        await this.waitForElement(this.emptyCartMessage);
        expect(await this.emptyCartMessage.isDisplayed()).to.be.true;
    }
}

export default new CartPage();
