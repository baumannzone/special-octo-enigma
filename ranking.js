const { writeFileSync } = require( 'fs' );
const downloads = require( './downloads.json' )

let total = 0
const order = Object.keys( downloads )
  .sort( ( a, b ) => {
    return downloads[ b ] - downloads[ a ]
  } )
  .map( i => {
    total += downloads[ i ]
    return { [ i ]: downloads[ i ] }
  } )

writeFileSync( './npm_ranking.json', JSON.stringify( order, null, 2 ) )
writeFileSync( './npm_totals.json', JSON.stringify( { total, packages: order.length }, null, 2 ) )

console.log( order )


