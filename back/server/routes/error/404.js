'use strict'

let get404 = async( ctx , next ) => {
    ctx.response.body = global.views['404'] 
    ctx.status = 404 
}

let post404 = async( ctx , next ) => {
    ctx.response.body = { status : 404 }
    ctx.status = 404
}

exports = module.exports = {
    'GET /404' : get404 , 
    'POST /404' : post404
}
