const { writeFileSync } = require( 'fs' );
const { getPackages } = require( './scrapers/npm-organization-packages' );
const { getPackageDetail } = require( './scrapers/npm-package-detail' );


( async () => {
  const urls = await getPackages()

  console.log( '<<urls>>' )
  console.log( urls.length )
  console.log( 'he terminado...' )

  // const chuckSize = 10;
  // const chunks = [...Array( Math.ceil( urls.length / chuckSize ) )].map( _ => urls.splice( 0, chuckSize ) )

  // console.log( chunks )

  const packages = {}
  for await ( let url of urls ) {
    // await Promise.all( chunks.map( getPackageDetail ) )

    console.log( url )
    const packageName = url.split( 'https://www.npmjs.com/package/' )[ 1 ]
    packages[ packageName ] = await getPackageDetail( packageName )
    console.log( packages[ packageName ] )
  }

  writeFileSync( './downloads.json', JSON.stringify( packages, null, 2 ) )

} )()
