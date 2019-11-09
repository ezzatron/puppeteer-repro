const fileUrl = require('file-url')
const puppeteer1 = require('puppeteer1')
const puppeteer2 = require('puppeteer2')
const {join} = require('path')

main().catch(error => {
  console.error(error)
  process.exit(1)
})

async function main () {
  await produceScreenshot(puppeteer1, 'output/puppeteer1.png')
  await produceScreenshot(puppeteer2, 'output/puppeteer2.png')
}

async function produceScreenshot (puppeteer, outputPath) {
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()

    await page.setViewport({width: 180, height: 180})
    await page.goto(fileUrl(join(__dirname, 'input.html')))
    await page.screenshot({path: join(__dirname, outputPath), omitBackground: true})
  } finally {
    await browser.close()
  }
}
