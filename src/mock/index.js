const Mock = require('mockjs')  

Mock.mock('http://localhost:9999/user/login','post', (param)=>{  
    let body = JSON.parse(param.body);
    let code,message,data;
    //模拟用户名和密码都是 admin
    if(body.username=='admin'&&body.password=='123456'){
        code=20000;
        message = 'success'
        data = Mock.mock({
            "token": "@guid()",//模拟token
        });
    }
    else{
        code = 20001;
		message = 'wrong'
        data = null
    }
    return{
        "code":code,
        "data":data,
        "message": message
    }


});
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function generateRandomNumber(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
Mock.mock('http://localhost:9999/user/table','post', ()=>{
    count = 1  
    data = []
    for(let i = 0; i < 25; i++){
        data.push({
        'id' : count,
        'username' : 'user' + count++,
        'phone' : '1'+ generateRandomNumber(10),
        'email' : generateRandomString(6) + '@abcd.com',
        'status' : '1'
        })
    }
   return data


});

