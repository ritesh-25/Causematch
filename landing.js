const express = require("express");
const app = express();
const mongoose = require("mongoose");

//database
const database = module.exports=()=>{
     const connectionParams = {
          useNewUrlParser: true,
          useUnifiedTopology:true,
     }
     try{
          mongoose.connect("mongodb+srv://riteshbaindara25:s9VcYPFdj1fXqu7U@cluster0.v4qxo58.mongodb.net/?retryWrites=true&w=majority",
          connectionParams
          );
          console.log("connected");
     }
     
      catch (error){
    console.log("error");
     }
}
database();

const fruitSchema = new mongoose.Schema({
     name: String,
     rating: Number,
     review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

//now we can make a fruit collection

const fruit = new Fruit({
     name:"Apple",
     rating:10,
     review: "red"
});
// fruit.delete();
const peopleSchema = new mongoose.Schema({
     name: String,
     rating: Number,
     review: String
});

const People = mongoose.model("People",peopleSchema);

//now we can make a fruit collection

const people = new People({
     name:"ritesh",
     age:19
});
people.save();
mongoose.connection.close();
app.listen(3000,function(){
console.log("haa bhai kam kr gya");
});