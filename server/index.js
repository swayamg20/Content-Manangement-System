const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const methodOverride = require("method-override");
const competitionsdb = require("./models/competitionsModel");
const User = require("./models/userSchemaCTM")
const app = express();

const port = process.env.PORT || 4000;

var cors = require("cors");
app.use(cors());

app.use(bodyParser.json())

//body parser
app.use(express.urlencoded({ extended: false }));

//method override
app.use(methodOverride("_method"));

// Connecting with database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://swayamg20:swayam@cluster0.ix4jgpc.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Connection successful..."))
  .catch((err) => console.log(err));

app.post("/api23/ctm/competitions", async (req, res) => {
  console.log("Cd");
  console.log(req.body)
  const apprec = new competitionsdb({
    title: req.body.category,
    subTitle: req.body.subCategory,
    competitionsName: req.body.compName,
    description: req.body.content,
    prizeMoney: req.body.prize,
    updatedBy:req.body.updatedBy
  });

      const blog = await competitionsdb.insertMany([apprec]);
      console.log(blog);

     
      res.send(blog)
});

app.get('/',(req,res) =>{
  res.send("running")
})

app.get('/api23/get-competitions', async (req,res)=>{
  const competitions = await competitionsdb.find();
  res.send(competitions)
})

app.get('/api23/get-competitions/:id', async (req,res)=>{
  const competitions = await competitionsdb.findById(req.params.id);
  res.send(competitions)
})

app.get('/api23/auth/:userId', async (req,res)=>{
  const uid = req.params.userId;
  const userDetail = await ContentUser.findOne({uid:uid});
  console.log(userDetail)
  if(userDetail.accessHead && userDetail.accessOrganizer===false)
  res.send("head");
  else if (userDetail.accessHead===false && userDetail.accessOrganizer)
  res.send("organizer");
  else if (userDetail.accessAll)
  res.send("admin");
  else if (userDetail.accessHead===false && userDetail.accessOrganizer===false && userDetail.accessAll===false)
  res.send("restricted");
  else
  res.send('ff')
})

app.post('/api23/tcm/auth', async (req,res)=>{
  const uid = req.body.uid;
  const email = req.body.email;
  console.log(uid)
  const checkUser = await ContentUser.findOne({uid:uid})
  if(checkUser === null)
  {
    const newUser = new User({
      uid: uid,
      email:email
    });
    const userDetail = await ContentUser.insertMany([newUser]);
    res.send(userDetail)
  } else{
    res.send(checkUser);
  }
})

app.delete('/api23/tcm/delete-team/:teamId', async(req,res)=>{
  const teamId = req.params.teamId;
  await teamDataMain.findByIdAndDelete(req.params.teamId);
})

app.put('/api23/update-competition', async (req,res)=>{
  const objId = req.body.objId;
  const compName = req.body.compName;
  const content = req.body.content;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const prize = req.body.prize;
  const updateBy = req.body.updateBy;
  console.log(objId)
  await competitionsdb.findByIdAndUpdate(
    objId,
    {
        title: category,
        subTitle:subCategory,
        competitionsName: compName,
        description: content,
        prizeMoney: prize,
        updateBy: updateBy
    },
  )

  res.send("Updated")
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
