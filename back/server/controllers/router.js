'use strict'

/**
 * 只需要在 /server/routes 文件目录下
 * now：支持多级目录
 * dev：解决method和url相同的路由重复注册问题
 */

const fs = require( 'fs' )
const path = require( 'path' )

Object.prototype.filter = function( func ) {
    let ret = {}
    for( let key of Object.keys( this ) ) {
        if( this.hasOwnProperty( key ) ) {
            ret[ func( key ) ] = this[ key ]
        } 
    }
    return ret
}

function validMethod( method ) {
    return method === 'get' || method === 'post'
}

function addRoutes( router , file , times ) {
    let ret = file.filter( key => key.trim().toLowerCase() )
    let path = '' , 
        keys = Object.keys( ret ) , 
        method = '' , 
        url = ''

    for( let key of keys ) {
        if( key.split(' ').length > 2 || validMethod( key.split( ' ' )[0] ) === false ) {
            console.log( '  '.repeat( times ) + `无效路由`)
            continue
        }
        let value = ret[ key ]
        method = key.split( ' ' )[0]
        url = key.split( ' ' )[1]
        router[ method ]( url , value)
        console.log( '  '.repeat( times ) + `${ method } register: ${ url }`)
    }
}

function scanRoutes( router , dir , level ){
    let files = fs.readdirSync( dir )
    for( let f of files ) {
        let absPath = path.join( dir , f ) , 
            fileInfo = fs.statSync( absPath )
        if( fileInfo.isFile() && absPath.endsWith( '.js' ) ) {
            console.log( `Scan and Register routes: ${ absPath }...` )
            let _ = require( absPath )
            addRoutes( router , _ , level )
        } else if( fileInfo.isDirectory() ) {
            scanRoutes( router , absPath , level +1 )
        }
    }
}

module.exports = dir => {
    let router = require( 'koa-router' )()
    scanRoutes( router , dir , 1 )
    return router.routes()
}
