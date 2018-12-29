const express = require("express");
const formidable = require("formidable");
const mongoose = require("mongoose");
const Tiezi = require("./models/tiezi.js")
const app = express()

const path = require("path")

//连接收据库
mongoose.connect("mongodb://127.0.0.1/shuoshuo")
//静态化路由
app.use(express.static("./uploads"))
// app.use(express.static("./uploads"))


app.post("/upload",(req,res)=>{
    var form = formidable.IncomingForm();
    // 将上传的图片写入到uploads文件夹中
    form.uploadDir = "./uploads";
    // 保留文件拓展名
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
    // 得到的是path的 也就是图片的路径
    // path.parse() 方法返回一个对象，对象的属性表示 path 的元素。将路径返回给前端
        // console.log(path.parse(files.file.path).base);
        res.json({
            "result" : path.parse(files.file.path).base
        })
    })
})
// 前端将用户名，用户头像，上传的图片，发表的内容，返回给后端，写入数据库中
app.post("/shuoshuo",(req,res)=>{
    var form = formidable.IncomingForm();
    //将要上传的数据写进数据库中
    form.parse(req,(err,fields,files)=>{
        Tiezi.create({
            nickName : fields.nickName,
            avatarUrl : fields.avatarUrl,
            content: fields.content,
			fwqPics : fields.fwqPics,
            time : new Date(),
        },function(){
            //告诉小程序已经写进去了
            res.json({
                "result" : 1
            })
        })
    })
})
app.get("/qingdan",(req,res)=>{
    //find代表查找，sort代表排序，exec是执行的意思
    Tiezi.find({}).sort({"time" : -1}).exec((err,docs)=>{
        // console.log(docs)
        res.json({
            "result" : docs
        })
    })
})
app.listen(3000);
console.log(3000)