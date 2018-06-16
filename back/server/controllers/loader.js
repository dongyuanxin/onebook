'use strict'

const path = require( 'path' ) 
const { _global } = require( path.join( __dirname , '..' , '..' , 'config.js') )

exports = module.exports = () => {
    let keys = Object.keys( _global )
    for( let key of keys ) {
        // 防止覆盖原来的属性
        if( global.hasOwnProperty( key ) === false ) {
            global[ key ] = _global[ key ]
        } else {
            console.log( 'Confictiong at key: ' + key )
        }
    }
}
