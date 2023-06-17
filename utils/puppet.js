import puppeteer from 'puppeteer'

/**
 *
 * @param {string} context - tells what to log in the console
 */
export const botClocker = async (context) => {
  const contextString = context == 'clock_in' ? 'Clocking in' : 'Clocking out'
  console.log(contextString)

  const browser = await puppeteer.launch({
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

    // TODO: actually click the button!!!
    const button = await page.waitForSelector('#time_btn')
    // await button.click()

    //
  } catch (error) {
    console.error(error)

    //
  } finally {
    await page.screenshot({ path: `./screenshots/${context}.png` })
    console.log(`${context}.png is now updated.`)

    await browser.close()
  }
}
