import puppeteer from 'puppeteer'
import moment from 'moment-timezone'
import * as dotenv from 'dotenv'

dotenv.config()

/**
 *
 * @param {string} context - tells what to log in the console
 */
export const botClocker = async (context) => {
  let contextString = ''
  const today = new Date()
  const timeStamp = moment.tz(today, 'Asia/Taipei').toLocaleString()

  switch (context) {
    case 'clock_in':
      contextString = `Clock in: ${timeStamp}`
      break

    case 'clock_out':
      contextString = `Clock out: ${timeStamp}`
      break

    default:
      const errorMsg = `Context ${context} is undefined, closing program`
      throw new Error(errorMsg)
  }

  console.log(contextString)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: 'new',
  })

  const page = await browser.newPage()
  await page.goto('https://app.salarium.com/')
  await page.setViewport({ width: 1920, height: 1080 })

  try {
    // email
    const inputEmail = await page.waitForSelector('input[name="email"]')
    await inputEmail.type(process.env.EMAIL)

    // password
    const inputPassword = await page.waitForSelector('input[type="password"]')
    await inputPassword.type(process.env.PASSWORD)

    await inputPassword.press('Enter')
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const button = await page.waitForSelector('#time_btn')
    await button.click()

    //
  } catch (error) {
    console.error(error)
    process.exit(1)

    //
  } finally {
    await page.screenshot({ path: `./screenshots/${context}.png` })
    await browser.close()
  }
}

/**
 *
 */
export const puppetTester = async () => {
  console.log(`Current user: ${process.env.EMAIL}`)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: 'new',
  })

  const page = await browser.newPage()

  try {
    console.log('Checking Chromium installation...')
    await page.goto('https://google.com/')
    await page.setViewport({ width: 1920, height: 1080 })
    console.log('Chrome is working')
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await page.screenshot({ path: `./screenshots/test_run.png` })
    await browser.close()
  }
}
