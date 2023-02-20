import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
    Key,
} from "selenium-webdriver";

/* Are we copying the functions above from a selenium driver? */

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");
/* We are stating that that locators can also be replaced by the by. function */

describe("Employee Manager 1.2", () => {

    beforeEach(async () => {
        await driver.get(
        "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"
        );
    });
    afterAll(async () => {
        await driver.quit();
    });
    describe("handles unsaved, canceled, and saved changes correctly", () => {
        test("An unsaved change doesn't persist", async () => {
        /*
        This test follows these steps:
        1. Open Bernice Ortiz
        2. Edit the name input
        3. Open Phillip Weaver
        4. Open Bernice Ortiz
        5. Verify the name field is the original name
        */
        await driver.findElement(By.name("employee1")).click();
        await driver.wait(
            until.elementIsVisible(await driver.findElement(By.name("employee1")))
        );
        await driver.findElement(By.name("nameEntry")).clear();
        await driver.findElement(By.name("nameEntry")).sendKeys("Test Name");
        await driver.findElement(By.name("employee3")).click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(By.name("employee3")),
            "Phillip"
            )
        );
        await driver.findElement(By.name("employee1")).click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(By.name("employee1")),
            "Bernice"
            )
        );
        
        });

        test("A canceled change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
            await driver.sleep(3000)
            await driver.findElement(phillip).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(phillip))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys("Test Name");
            await driver.findElement(cancelButton).click();
            
        });

        test("A saved change persists", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Save the change
            4. Open Phillip Weaver
            5. Open Bernice Ortiz's old record
            5. Verify the name field is the edited name
            */
            await driver.findElement(By.name("employee1")).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(By.name("employee1")))
            );
            await driver.findElement(By.name("nameEntry")).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys("Test Name");
            await driver.findElement(By.id("saveBtn")).click();
            await driver.findElement(By.name("employee3")).click();
            await driver.wait(
                until.elementTextContains(
                await driver.findElement(By.name("employee3")),
                "Phillip"
                )
            );
            await driver.findElement(bernice).click();
            
    });
});

    describe("handles error messages correctly", () => {
        test("shows an error message for an empty name field", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            */
            await driver.findElement(By.name("employee1")).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(By.name("employee1")))
            );
            await driver.findElement(By.name("nameEntry")).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(By.id("saveBtn")).click();
            await driver.wait(until.elementLocated(By.css(".errorCard")));
            expect(await (await driver.findElement(By.css(".errorCard"))).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
        });
        test("lets you cancel out of an error message", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            5. Cancel the change
            6. Verify the error is gone
            */
            await driver.findElement(By.name("employee1")).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(By.name("employee1")))
            );
            await driver.findElement(By.name("nameEntry")).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(By.id("saveBtn")).click();
            await driver.wait(until.elementLocated(By.css(".errorCard")));
            expect(await (await driver.findElement(By.css(".errorCard"))).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
            await driver.findElement(By.name("nameEntry")).sendKeys(Key.SPACE);
            await driver.findElement(By.name("cancel")).click();
            driver.wait(() => true, 500);
            expect(await driver.findElements(By.name("nameEntry"))).not.toHaveLength(0);
            // testing notes 
        });
    });
});