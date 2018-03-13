let user = require('./User');

console.log(`username = ${user.userName}`)
console.log(`username = ${user.sayHello()}`)

let http = require('http')
let url = require('url')
let util = require('util')

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; chartset = utf-8')
  res.end('hello,node.js'+util.inspect(url.parse(req.url)))
}).listen(3000, '127.0.0.1', () => {
  console.log('服务器运行，http://127.0.0.1:3000')
})
