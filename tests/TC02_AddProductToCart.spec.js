import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';
import { DashboardPage } from '../POM/DashboardPage';
import { CheckoutPage } from '../POM/CheckoutPage';
import data from '../test-data/TC02_AddProductToCart.json';

const username = process.env.USERNAME2
const password = process.env.PASSWORD2

//TC02 sent for review
test("@smoke TC02_Add Product to cart", async ({page})=>{

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


})