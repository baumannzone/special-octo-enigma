const puppeteer = require( 'puppeteer' );
const { writeFileSync } = require( 'fs' );

const getPackages = async () => {

  const escapeXpathString = str => {
    const splitedQuotes = str.replace( /'/g, `', "'", '` );
    return `concat('${ splitedQuotes }', '')`;
  };

  const clickByText = async ( page, text ) => {
    const escapedText = escapeXpathString( text );

    let stillWorkToDo = true;
    while ( stillWorkToDo ) {
      const linkHandlers = await page.$x( `//a[contains(text(), ${ escapedText })]` );

      if ( linkHandlers.length > 0 ) {
        console.log( '<<<<<<<<<<<<<linkHandlers[ 0 ]>>>>>>>>>>>>>' )
        await linkHandlers[ 0 ].click();
        await page.waitForTimeout( 1000 )
      }
      else {
        stillWorkToDo = false
        console.log( `Link not found: ${ text }` )
      }
    }
  };


  const browser = await puppeteer.launch( { headless: true, devtools: true } )

  const page = await browser.newPage()
  await page.goto( 'https://www.npmjs.com/~guidesmiths_bot' )

  await page.waitForSelector( 'main ._0897331b' );


  await clickByText( page, `show more packages` );


  let urls = await page.$$eval( 'section .w-80', links => {
    const justLinks = links.map( link => {
      return link.querySelector( 'a' ).href
    } )
    return justLinks;
  } );



  await browser.close()
  writeFileSync( './urls.json', JSON.stringify( urls, null, 2 ) )
  return urls
}

module.exports = {
  getPackages
}
