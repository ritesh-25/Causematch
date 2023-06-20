const express  = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");
const encrypt = require("mongoose-encryption");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/landing.html");
});
app.get("/login",function(reqq,ress){
ress.sendFile(__dirname + "/login.html");
});
app.get("/signup",function(req,res){
res.sendFile(__dirname + "/signup.html");
});
app.get("/ngosignup",function(req,res){
    res.sendFile(__dirname + "/ngosignup.html");
});
app.get("/ngologin",function(req,res){
    res.sendFile(__dirname + "/ngologin.html");
});
mongoose.connect('mongodb+srv://riteshbaindara25:0Wz69JuE0DUccUfP@causematch.l6lkkmh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
})
const ngoSchema = new mongoose.Schema({
username: String,
email: String,
password: String,
});
const sec = "Thisisourliitlesecret";
ngoSchema.plugin(encrypt,{secret:sec, encryptedFields:["password"]});
const ngouser = mongoose.model("ngouser",ngoSchema);

app.post("/signupngo",function(req,res){
const newngo = new ngouser({
username: req.body.ngoname,
email: req.body.username,
password: req.body.password
});
newngo.save();
res.render("ngolanding",{y:newngo});
});

const userSchema = new mongoose.Schema({
email: String,
password: String,
});
const secret = "Thisisourliitlesecret";
userSchema.plugin(encrypt,{secret:secret, encryptedFields:["password"]});
const causematchUser = mongoose.model("causematchUser",userSchema);
app.post("/signup",function(req,res){
const newperson = new causematchUser({
    email: req.body.email,
    password: req.body.newpassword
});
newperson.save();
res.sendFile(__dirname + "/donating.html");
});

app.post("/login",function(req,res){
const username = req.body.username;
const password = req.body.password;
causematchUser.findOne({email:username}).then(post=>{
    if(post.password===password){
        res.sendFile(__dirname + "/donating.html")

    }
    else{
        console.log(post.password);
    }
    });
});
app.post("/ngologin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    ngouser.findOne({email:username}).then(post=>{
        if(post.password===password){
            res.render("ngolanding",{y:post});
        }
        else{
            console.log(post.password);
        }
    });
});
const donationrequest = new mongoose.Schema({
    name: String,
    descryption: String
});
const request = mongoose.model("request",donationrequest);

app.post("/ngolanding",function(req,res){
    const newrequest = new request({
    name: req.body.ngoname,
    descryption: req.body.descryption
    });
    newrequest.save();
    ngouser.findOne({email:req.body.email}).then(post=>{
        res.render("ngolanding",{y:post});
    });
});
const donatingSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    descryption: String
});

const donation = mongoose.model("donation",donatingSchema);
app.get("/donate",function(req,res){
res.render("donate");
});

app.post("/donate",function(req,res){
const newdonation = new donation({  
    name : req.body.name,  
    email : req.body.email,
    contact : req.body.contact,
    descryption: req.body.descryption
});
newdonation.save();
res.render("thanku",{namee: newdonation.name});
});

app.get("/donatebyuse",function(req,res){
    donation.find({}).then(function(founddonations){
    res.render("donabyuse",{newListItems:founddonations});
    });
});

app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    donation.findOneAndDelete({ _id: checkedItemId })
  .then((result) => {
    if (result) {
      console.log('Document deleted successfully:', result);
    } else {
      console.log('Document not found');
    }
  })
  .catch((error) => {
    console.log('Error deleting document:', error);
  });
  res.redirect("/donatebyuse");
});

app.listen(process.env.PORT||3000,function(){
console.log("haa bhai kam  gya");
});
