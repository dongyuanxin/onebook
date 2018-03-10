'use strict'

export function json2html(json){
    let html = '',level = 0
    let  _json2html = function (json,keyArr){
        let keys = Object.keys(json)
        level+=1
        for(let key of keys) {
            let item = json[key]
            if(typeof item === 'object'){
                html += `<p class="level-${level}">${key}</p>\n`
                _json2html(item,keyArr + " " + key)
            }
            else {
                // data中保存 文章的分类信息
                html += `<a data="${keyArr} ${item}">` + item + '</a><br/>\n' 
            }
        }
        level-=1
    }
    _json2html(json,"")
    return html
}
