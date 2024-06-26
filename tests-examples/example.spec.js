// @ts-check
import {test, expect} from "@playwright/test";


test.describe.skip(("Auth"),() =>{
  test.describe(("Log in"),() =>{

  test.beforeAll(async ()=>{
    console.log("BEFORE ALL");
  });

  test.beforeEach(async ({page})=>{
    console.log("BEFORE EACH");
  });

  test.afterEach(async ({page})=>{
    console.log("AFTER EACH");
  });

  test.afterAll(async ()=>{
    console.log("AFTER ALL");
  });

  test("First test", async ({page}) => {
    await page.goto("https://playwright.dev/");

    await expect(page).toHaveTitle(/Playwright/);
    console.log("First test");
  });

  test("Second test", async ({page}) => {
    await page.goto("https://playwright.dev/");

    await expect(page).toHaveTitle(/Playwright/);
    console.log("Second test");
  });

  });
});

test.describe.only("ADD TODO", ()=>{
  test.describe("TODO Create", ()=>{

    test.beforeEach(async ({page})=>{
      await page.goto('https://demo.playwright.dev/todomvc')
    })

    test('should allow me to add todo items', async ({ page }) => {
      const todoText = "Learn Playwright"

      await test.step("enter todo text and submit", async ()=>{
        const newTodo = page.getByPlaceholder('What needs to be done?');
        await newTodo.fill(todoText);
        await newTodo.press('Enter');
      })

      await test.step("Check todo is created", async ()=>{
        await expect(page.getByTestId('todo-title')).toHaveText([
          todoText
        ]);
      })
    });
  });
});