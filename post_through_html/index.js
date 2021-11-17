const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended : true}));

dotenv.config();

// connect to db
mongoose.connect(
  process.env.add_connect,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);

const hellosSchema = {
    title : String,
    content : String
}
const Hello = mongoose.model("Hello",hellosSchema)

app.get("/",function(req ,res)
{
    res.sendFile(__dirname + "/starti.html");

})
app.post("/",function(req,res)
{
    let newHello = new Hello({
        title : req.body.title,
        content : req.body.content
    });
    newHello.save();
    res.redirect("/");
})

app.listen(4000, () => console.log("server up and runing on port 4000!"));
