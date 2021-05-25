let mysql =require ('mysql');
let options={
    host:"localhost",
    port:"3306",
    user:"root",
    password:"123456",
    database:"yygl",
    insecureAuth : true
}

let con =mysql.createConnection(options);

con.connect((err)=>{

    if(err){
        console.log(err)
    }else{
        console.log('数据库连接成功')
    }
})

function sqlQuery(strSql,arr){
    return new Promise(function (resolve,reject){
        con.query(strSql,arr,(err,results)=>{
            if (err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports=sqlQuery;
//创建表
/*
let strSql1=
`
create table user(
    id,
    username,
)
`
con.query(strSql1,(err,results)=>{
    console.log(err)
    console.log(results)
})
*/

//插入数据
//法一
/*
let strSql2="insert into user(id,username)values(1,'刘')" 
con.query(strSq2,(err,results)=>{
    console.log(err)
    console.log(results)
})
*/
//法二
/*
let strSql2="insert into user(id,username)values(？,？)" 
con.query(strSq2,[1,"刘"],(err,results)=>{
    console.log(err)
    console.log(results)
})
*/

//查询
/*let strSql="select * from user";
con.query(strSql,(err,results,fields)=>{
    console.log(err)
    console.log(results)
    console.log(fields)
}*/


