const express = require('express')
const mongoose = require('mongoose')
var multer = require('multer');
var path = require("path")
var url = require('url')
var fs = require("fs");
const DB_URL = 'mongodb://127.0.0.1:27017/haha'
var bodyParser = require('body-parser');


// const uploadImg = require('./img')
// 连接数据库
mongoose.connect(DB_URL, { useNewUrlParser: true })
const User = mongoose.model('user', new mongoose.Schema({
    phone: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
})
)
const Customer = mongoose.model('customer', new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
})
)

//新建app
const app = express()
app.use(express.static("../src/static"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function getPostData(req) {
    let postData = '';
    await req.on('data', function (postDataChunk) {
        postData += postDataChunk;
    })
    return postData
}



var upload = multer({ dest: './../src/static/img/'}) // 文件储存路径
app.post('/uploader', upload.single('avatar'), function(req, res, next) {
    console.log(req.file)
    // const newname=req.file.path+path.parse(req.file.originalname).ext
    const newname=req.file.destination+req.file.originalname
    // const newname=req.file.destination+new Date().getTime() + path.parse(req.file.originalname).ext
    fs.rename(req.file.path,newname,function(err){
        if(err){
            res.send({code:400, message:'上传失败'})
        }else{
            res.send({code:200, url:req.file.originalname})
        }
    })
});




app.post('/file_upload', function (req, res) {
    fs.readFile('./2.jpg' , (err,  data)=>{
        console.log( 'err' , err , ' data' ,  data.toString()) 
    })
})

// 注册接口
app.post('/register', (req, res) => {
    if (req.method == 'POST') {
        User.findOne({ 'phone': req.body.phone }, (err, data) => {
            if (data == null) {
                User.create({
                    'phone': req.body.phone,
                    'password': req.body.password,
                    'name': req.body.name,
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
    }
})
//登陆接口
app.post('/login', (req, res) => {
    if (req.method == 'POST') {
        User.findOne({ 'phone': req.body.phone }, (err, data) => {
            if (data == null) {
                res.send({ code: 300, 'message': '该手机号还未注册，请先注册' });
            } else if (data) {
                if (req.body.password == data.password) {
                    res.json({ code: 200, 'message': '登陆成功', ...data._doc });
                } else {
                    res.send({ code: 400, 'message': '账号密码错误' });
                }
            }
            if (err) {
                console.log(err)
            }
        })
    }
})
//登陆接口

app.get('/loadinfo', (req, res) => {
    var arg = url.parse(req.url, true).query
    if (arg.phone) {
        User.findOne({ phone: arg.phone }, (err, data) => {
            if (!err) {
                res.json({ code: 200, ...data._doc })
            }
        })
    }

})

//
app.put('/personal/information/:id', (req, res) => {
    User.findOne({ '_id': req.params.id }, (err, data) => {
        User.updateOne({ '_id': req.params.id }, { $set: { ...JSON.parse(req.body) } }, (err, doc) => {
            console.log(err, doc)
            if (!err) {
                User.findOne({ '_id': req.params.id }, (err, data) => {
                    res.json({ code: 200, 'message': '成功', ...data._doc });
                })
            } else {
                res.json({ code: 400, 'message': '失败' });
            }
        })
    })
})

app.get('/', (req, res) => {
    res.send('hello node.js')
})
app.get('/add', (req, res) => {
    User.create({
        name: '小明67',
        age: 22
    }, (err, doc) => {
        if (!err) {
            console.log('增加成功')
        } else {
            console.log(err)
        }
    })
})
app.get('/data', (req, res) => {
    User.find({}, (err, data) => {
        console.log(data)
        return res.send(data)
    })
})
app.get('/datas', (req, res) => {
    Customer.find({}, (err, data) => {
        return res.send(data)
    })
})
app.get('/delete', (req, res) => {
    User.remove({ age: 26 }, (err, data) => {
        console.log(data)
        return res.send(data)
    })
})
app.get('/update', (req, res) => {
    User.update({ age: 30 }, { '$set': { age: 25 } }, (err, data) => {
        return res.send(data)
    })
})
app.post('/dd', (req, res) => {
    if (req.method == 'POST') {
        var postData = "";
        // 数据块接收中
        req.on('data', function (postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function () {
            console.log('数据接收完毕', postData, JSON.parse(postData).name);
            User.find({ name: JSON.parse(postData).name }, (err, doc) => {
                console.log(err, doc)
            })
        });
        // res.send({a:123})
    }

})
app.post('/register', (req, res) => {
    if (req.method == 'POST') {
        var postData = "";
        // 数据块接收中
        req.on('data', function (postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function () {
            Customer.create({ name: JSON.parse(postData).name, password: JSON.parse(postData).password }, (err, doc) => {
                if (!err) {
                    res.send({})
                }
            })
        });
    }

})
//监听事件 及 监听端口
app.listen(8001, (err) => {
    if (!err) {
        console.info('listen to 8001')
    }
})