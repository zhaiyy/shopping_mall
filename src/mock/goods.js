import Mock from 'mockjs'

 Mock.mock('/goods',{
  'status':'0',
  'result|1-10':[
    {
      "productId|+1":10001,
      "productName":'@cword(2,5)',
      "prodcutPrice|0-2000":0,
      "prodcutImg": /[1-9]\.jpg/,
    }
  ],
})
// 输出结果
