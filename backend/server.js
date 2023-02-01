const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser") //รับ request JSON URL

app.use(bodyParser.urlencoded({extended: false}))  // bodyParser แปลข้อมูลที่เข้ามาผ่าน body หรือเป็นการถอดข้อมูลที่ทำการยิงเข้ามาแล้วส่งออก
app.use(bodyParser.json())

// express
// app.use(express.urlencoded({extended: true}))  
// app.use(express.json())

app.use(express.static(__dirname + "/uploaded"))   //ปิดกัน path เปิดให้ดูเฉพาะ path /image
app.use(cors())
app.use("/api/v2", require("./api"))


app.listen(8081, ()=>{
    console.log("Server is running")
})

