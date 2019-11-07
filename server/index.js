const express = require('express') 
const mongoose = require('mongoose')
var path = require("path")
var url = require('url')
const DB_URL = 'mongodb://127.0.0.1:27017/haha'
// 连接数据库
mongoose.connect(DB_URL , { useNewUrlParser: true } )      
const User = mongoose.model('user' , new mongoose.Schema({
    phone:{type:String , required:true},
    password:{type:String , required:true},
    name:{type:String , required:true},
})
)
const Customer = mongoose.model('customer' , new mongoose.Schema({
    name:{type:String , required:true},
    password:{type:String , required:true},
})
)

//新建app
const app = express()


app.use(express.static( "../src/static"))


// app.get('*', function (req, res) {
//     console.log("111111111111111")
//   res.sendFile(path.join(__dirname, 'index.html'))
// })
 async function getPostData(req){
    let postData = '';
    await req.on('data', function (postDataChunk) {
        postData += postDataChunk;
    })
    return postData
}


// 注册接口
app.post('/register', (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        getPostData(req).then(postData => {
            User.findOne({ 'phone': JSON.parse(postData).phone }, (err, data) => {
                if (data == null) {
                    User.create({ 
                        'phone': JSON.parse(postData).phone, 
                        'password': JSON.parse(postData).password,
                        'name':JSON.parse(postData).name,
                    }, (err, doc) => {
                        if (err) {
                            res.send({ code: 400, 'message': '注册失败' })
                        } else {
                            res.send({ code: 200, 'message': '注册成功' })
                        }
                    })
                } else {
                    res.send({ code: 400, 'message': '手机号冲突，注册失败' })
                }
            })
        })
    }
})
//登陆接口

app.post('/login' , (req , res)=>{
    if(req.method == 'POST'){
        var postData = "";
        // 数据块接收中
        req.on('data', function (postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function () {
           User.findOne({'phone':JSON.parse(postData).phone} , (err , data)=>{
            if(data == null){
                res.send({code:300 , 'message':'该手机号还未注册，请先注册'});
            }else if(data){
                if(JSON.parse(postData).password == data.password){
                    console.warn(data , {code:200 , 'message':'登陆成功' , ...data._doc})
                    res.json({code:200 , 'message':'登陆成功' , ...data._doc });
                }else{
                    res.send({code:400 , 'message':'账号密码错误'});
                }
            }
           })
        });
    }
})
//登陆接口

app.get('/loadinfo' , (req , res)=>{
    var arg = url.parse(req.url, true).query
    if(arg.phone){
        User.findOne({phone:arg.phone} , (err , data)=>{
            if(!err){
                res.json({code:200 , ...data._doc })
            }
        })
    }

})

//
app.put('/personal/information/:id' , (req , res)=>{
    User.findOne({'_id': req.params.id} , (err , data)=>{
        getPostData(req).then( getPostData=>{
            // console.log(JSON.parse(getPostData))
            User.updateOne({'_id':req.params.id} , { $set:{ ...JSON.parse(getPostData) }} , (err , doc)=>{
                console.log(err , doc)
                if(!err){
                    User.findOne({'_id': req.params.id} , (err , data)=>{
                        console.log(data)
                    })
                }
            } )
        })
    })
})

app.get('/' , (req , res )=>{
    res.send('hello node.js')
})
app.get('/add' , ( req , res)=>{
    User.create({
        name:'小明67',
        age:22
    } , (err , doc)=>{
        if(!err){
            console.log('增加成功')
        }else{
            console.log(err)
        }
    })
})
app.get('/data' , ( req , res)=>{
    User.find({} , (err , data)=>{
        console.log(data)
        return res.send(data)
    })
})
app.get('/datas' , ( req , res)=>{
    Customer.find({} , (err , data)=>{
        return res.send(data)
    })
})
app.get('/delete' , ( req , res )=>{
    User.remove({age:26} , (err , data)=>{
        console.log(data)
        return res.send(data)
    })
})
app.get('/update' , ( req , res )=>{
    User.update({age:30} , {'$set':{age:25}} , (err , data)=>{
        return res.send(data)
    })
})
app.post('/dd' , ( req , res )=>{
    if(req.method == 'POST'){
        var postData = "";
        // 数据块接收中
        req.on('data', function (postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function () {
            console.log('数据接收完毕' , postData , JSON.parse(postData).name);
           User.find({name:JSON.parse(postData).name} , (err , doc)=>{
            console.log(err , doc)
           })
        });
        // res.send({a:123})
    }
    
})
app.post('/register' , ( req , res )=>{
    if(req.method == 'POST'){
        var postData = "";
        // 数据块接收中
        req.on('data', function (postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function () {
           Customer.create({name:JSON.parse(postData).name , password:JSON.parse(postData).password } , (err , doc)=>{
               if(!err){
                res.send({})
               }
           })
        });
    }
    
})
//监听事件 及 监听端口
app.listen( 8001 , (err )=>{
    if(!err){
        console.info('listen to 8001')
    }
})