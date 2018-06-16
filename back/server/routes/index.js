'use strict'

exports = module.exports = {
    'GET /' : ( ctx , next ) => {
        ctx.response.body = '<h1>Hello</h1>'
        ctx.status = 200 
    }
}
