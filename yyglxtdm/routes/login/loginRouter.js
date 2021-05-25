var express = require('express');
var router = express.Router();
var crypto =require('crypto');
var sqlQuery=require('../../module/lcMysql');

function jiami(str){
  let salt="fjdsoigijasoigjasdiodgjasdiogjasid"
  let obj=crypto.createHash('md5')
  str =salt+str;
  obj.update(str)
  return obj.digest('hex')
}

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('login/register')
});
router.get('/login', function(req, res, next) {
  res.render('login/login.ejs')
  });

  router.post('/register',async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let sqlStr="select * from user where username=?";
   let result=await sqlQuery(sqlStr,[username]);
if(result.length!=0){
  res.render('info/info',{
    title:"失败",
    content :"用户存在",
    href:"/rl/register",
    hrefTxt:"注册页"
  })
}else{
  sqlStr="insert into user (username,password,role)values(?,?,1)"
 await sqlQuery(sqlStr,[username,jiami(password)])
  res.render('info/info',{
  title :"成功",
  content :"成功",
  href:"/rl/login",
hrefTxt:"登录"
})
  }
})
router.post('/login',async(req,res)=>{
  let username=req.body.username;
  let password=req.body.password;
  let sqlStr="select * from user where username=? and password = ?";
  let result =await sqlQuery(sqlStr,[username,jiami(password)])
  if(result.length==0){
    res.render('info/info',{
      title:"失败",
      content :"错误",
      href:"/rl/login",
      hrefTxt:"登录页"
    })
  }else{
    req.session.username=username;
    res.render('info/info',{
    title :"成功",
    content :"成功",
    href:"/admin",
  hrefTxt:"后台"
  })
    }
  })


module.exports = router;