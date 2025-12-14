
import { Given, When, Then } from '@wdio/cucumber-framework';

import homePage from '../pages/home.page.js';
import searchPage from '../pages/search.page.js';
import productDetailPage from '../pages/productDetail.page.js';
import cartPage from '../pages/cart.page.js';

import { expect } from "chai";


let savedProductPrice = 0;
let searchKeyword = "";


//  GIVEN 

Given(/^the user is on the Home Page and ready to search$/, async () => {
    await homePage.waitForHomeScreen();  
});


//  WHEN 

When(/^the user types "([^"]*)" into the search field and performs a search$/, async (keyword) => {
    searchKeyword = keyword;

    await homePage.openSearchScreen();
    await searchPage.searchForProduct(keyword);
});


When(/^the user selects the 2nd product from the list and saves its price$/, async () => {
    savedProductPrice = await searchPage.selectSecondProductAndCapturePrice();
    expect(savedProductPrice, "Price must be captured").to.be.a("number");
});


When(/^the product name on the product detail page contains "([^"]*)"$/, async (keyword) => {
    await productDetailPage.verifyProductNameContains(keyword);
});


When(/^the user clicks the add to cart button$/, async () => {
    await productDetailPage.addToCart();
});


When(/^the user navigates to the Cart page$/, async () => {
    console.log("➡️ Sepete gidiliyor...");
    await productDetailPage.goToCart();
});


When(/^the user removes the product from the cart$/, async () => {
    await cartPage.removeItemFromCart();
});


//  THEN 

Then(/^all product names in the results list should contain "([^"]*)"$/, async (keyword) => {
    await searchPage.verifyAllProductNames(keyword);
});


Then(/^the user should see the added product name in the cart$/, async () => {
    await cartPage.verifyProductName(searchKeyword);
});


Then(/^the product price in the cart should match the saved price$/, async () => {
    await cartPage.verifyPriceMatches(savedProductPrice);
});


Then(/^the user should see that the cart is empty$/, async () => {
    await cartPage.verifyCartIsEmpty();
});
