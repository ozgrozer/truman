const puppeteer = require('puppeteer')

const takeAScreenshot = async (opts) => {
  try {
    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked')
    })
    const page = await browser.newPage()
    await page.goto(opts.url)
    await page.setViewport({
      width: opts.viewportWidth,
      height: opts.viewportHeight
    })
    await page.screenshot({
      fullPage: true,
      path: opts.downloadPath
    })
    await browser.close()
    return true
  } catch (err) {
    return err
  }
}

module.exports = takeAScreenshot
