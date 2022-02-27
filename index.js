const express=require("express");
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const port=process.env.PORT || 3000;

const app=express();
app.use(bodyparser.json())
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/mydb",{
    useNewUrlParser:true,
    useUnifiedTopology:true

});

var db=mongoose.connection;
db.on('error',()=>console.log("error in connecting to database"));
db.on('open',()=>console.log("connected to the database"));
app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
   var phone=req.body.phone;
   var password=req.body.password;

   var data={

    "name":name,
    "email":email,
    "phone":phone,
    "password":password

   }

   db.collection('users').insertOne(data,(err,collection)=>{
       if(err)
       {
           throw err;
       }
       console.log("Record inserted successfullly..")
   });

return res.redirect("signup_success.html")

})

app.get('/',(req,res)=>{
    res.set({
        "allow-access-allow-origin":'"'
    });
    return res.redirect("index.html")
})

app.listen(port,()=>{
    console.log(`listening the port no. ${port} `);
})