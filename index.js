const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true })

  const page = await browser.newPage()
  await page.goto('https://www.npmjs.com/~guidesmiths_bot')

  await page.waitForSelector('main ._0897331b');

  let urls = await page.$$eval('section .w-80', links => {
    const justLinks = links.map(link => {
      return link.querySelector('a').href
    })
    return justLinks;
  });

  console.log('<<urls>>')
  console.log(urls)



  await browser.close()
})()
