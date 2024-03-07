import puppeteer from "puppeteer"

export class PuppeteerProvider {
  crawlContent = async (url: string) => {
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()
    await page.goto(url)


    const title = await page.title()
    await browser.close()

    return {
      title,
    }
  }
}