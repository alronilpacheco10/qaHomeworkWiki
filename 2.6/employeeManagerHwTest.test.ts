import {Builder,By, Capabilities, until, WebDriver, } from "selenium-webdriver";
  const chromedriver = require("chromedriver");

  const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  class employeePage {
      driver: WebDriver;
      url: string = "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";
      header:  By = By.id("titleText");
      employees: By = By.xpath("li");
      footer: By = By.name("footer");
      addEmployee: By = By.css('[name="addEmployee"]')
      newEmployee: By = By.css('[name="employee11"]')
      nameInput: By = By.css('[name="nameEntry"]')
      phoneInput: By = By.css('[name="phoneEntry"]')
      titleInput: By = By.css('[name="titleEntry"]')
      saveBtn: By = By.xpath('//button[@id="saveBtn"]')
      constructor (driver: WebDriver){
        this.driver = driver
      }
      async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.header))
      }
      async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy))
        return (await this.driver.findElement(elementBy)).click()
    }
    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy))
        return this.driver.findElement(elementBy).sendKeys(keys)
    }
        //FILL OUT LOCATORS CONSTRUCTOR AND METHODS IN ORDER TO PASS THE TEST
  }

const emPage = new employeePage(driver)

  describe("Employee Manger Test", () => {

      test("adding an employee", async () => {
        await emPage.navigate()
          await emPage.click(emPage.addEmployee)
          await emPage.driver.findElement(emPage.newEmployee).click()
          await emPage.driver.findElement(emPage.nameInput).click()
          await emPage.driver.findElement(emPage.nameInput).clear()
          await emPage.sendKeys(emPage.nameInput, "David Rose")
          await emPage.driver.findElement(emPage.phoneInput).click()
          await emPage.driver.findElement(emPage.phoneInput).clear()
          await emPage.driver.findElement(emPage.phoneInput).sendKeys("1112223333")
          await emPage.driver.findElement(emPage.titleInput).click()
          await emPage.driver.findElement(emPage.titleInput).clear()
          await emPage.driver.findElement(emPage.titleInput).sendKeys("Owner")
          await emPage.driver.quit()
  }) 
})
