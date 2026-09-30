import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';
import { DashboardPage } from '../POM/DashboardPage';
import { CheckoutPage } from '../POM/CheckoutPage';
import {PlaceorderPage} from '../POM/PlaceorderPage';
import {OrderPlacedPage} from '../POM/OrderPlacedPage';
import data from '../test-data/TC03_Checkout.json';


//TC03
const username = process.env.USERNAME2
const password = process.env.PASSWORD2

test("@regression TC01_Checkout and generate the orderID", async ({page})=>{

const loginpage = new LoginPage(page)
await loginpage.navigateTopage()
await loginpage.validLogin(username,password)

await expect((loginpage.signOutButton)).toBeVisible()

const dashboardpage = new DashboardPage(page)
await dashboardpage.searchAndaddProductToCart(data.productName)
await dashboardpage.clickOnCartButton()

const checkoutpage = new CheckoutPage(page)
await checkoutpage.waitForCheckoutPageToLoad()
await expect(checkoutpage.getCheckoutProductLocator(data.productName)).toBeVisible()
  await checkoutpage.clickOnCheckoutButton()

   //Place Order
   const placeOrderPage = new PlaceorderPage(page)
   await expect(placeOrderPage.getPlaceholderTextEmailLocator()).toHaveText(username)

   await placeOrderPage.searchAndAddCountry(data.countryName)
   await placeOrderPage.clickOnPlaceOrder()

   //order Placed 

   const orderPlacedPage = new OrderPlacedPage(page)
   await expect(orderPlacedPage.getOrderPlacedLoacator()).toHaveText(" Thankyou for the order. ")
   const orderID = await orderPlacedPage.getOrderIDText()
   console.log(orderID)


})