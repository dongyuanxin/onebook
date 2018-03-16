'use strict'

/**
 * url : https://raw.githubusercontent.com/godbmw/book/master/Javascript杂谈/image/深入JavaScript事件处理/事件冒泡.png
 * 参考文档 : http://blog.csdn.net/lihefei_coder/article/details/53022253 
 */

let testStr = `
[toc]
> 事件：是文档或浏览器窗口中发生的特定的交互瞬间。

## 1. 事件流
> 指的是：从页面中接受事件的顺序。分为：**事件冒泡流**和事件捕获流。

- 事件冒泡：
![事件冒泡.png](./image/深入JavaScript事件处理/事件冒泡.png)


- 事件捕获：
![事件捕获.png](./image/深入JavaScript事件处理/事件捕获.png)
`
let testBase = 'https://raw.githubusercontent.com/godbmw/book/master/Javascript杂谈'

export function replaceImgPath(base,str){
    let re = /!\[.*?\]\((.*?)\)/mg , replacedStr = str, exec = null
    let result = str.match(re) 
    while( (exec = re.exec(str))!==null ) {
        replacedStr = replacedStr.replace( exec['1'] , base + exec['1'].substr(1))
    }
    return replacedStr
}
