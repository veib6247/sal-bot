import puppeteer from 'puppeteer'
import * as dotenv from 'dotenv'

dotenv.config()

/**
 *
 */
const imARealBoi = async () => {
  // launch own chrome
  const browser = await puppeteer.launch({
    headless: 'new',
  })

  const page = await browser.newPage()
  await page.goto('https://app.salarium.com/')
  await page.setViewport({ width: 1920, height: 1080 })

  try {
    /**
     * EMAIL
     */
    console.log('Locating email input...')
    const inputEmail = await page.waitForSelector('input[name="email"]')

    console.log('Typing in email and pressing Enter...')
    await inputEmail.type(process.env.EMAIL)

    /**
     * PASSWORD
     */
    console.log('Locating password input...')
    const inputPassword = await page.waitForSelector('input[type="password"]')

    console.log('Typing in password and pressing Enter...')
    await inputPassword.type(process.env.PASSWORD)
    await inputPassword.press('Enter')

    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    //
  } catch (error) {
    console.error(error)

    //
  } finally {
    await page.screenshot({ path: 'screenshots/final.png' })
    await browser.close()
  }
}

// run da boi!!!
await imARealBoi()
