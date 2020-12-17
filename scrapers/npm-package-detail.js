const puppeteer = require( 'puppeteer' );

const getPackageDetail = async ( packageName ) => {

  const browser = await puppeteer.launch( { headless: true, devtools: true } )

  const page = await browser.newPage()
  await page.goto( `https://npm-stat.com/charts.html?package=${ packageName }&from=2020-01-01&to=2020-12-31` )

  await page.waitForSelector( '#content > section > table > tbody > tr:nth-child(2) > td:nth-child(2)' );
  const element = await page.$( '#content > section > table > tbody > tr:nth-child(2) > td:nth-child(2)' );
  const text = await page.evaluate( element => element.textContent, element );

  await browser.close()
  return Number( text.split( ',' ).join( '' ) )
}

module.exports = {
  getPackageDetail,
}
