import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/LoginPage';

const username = process.env.USERNAME1
const password = process.env.PASSWORD1

test("TC01_Login", async ({page})=>{

const loginpage = new LoginPage(page)
await loginpage.navigateTopage()
await loginpage.validLogin(username,password)

await expect((loginpage.signOutButton)).toBeVisible()

})