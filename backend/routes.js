const express = require("express");
const router = new express.Router();
require("./dbCon.js")
const cors = require("cors")
const {userCollection,accountCollection} = require("./dbModel.js");
//const userCollection = collections.userCollection;



// First requst
router.all("/",(req,resp)=>{
  resp.send({status:true,msg:"server alive"})
})
                //ADMIN ROUTES
// CREATE NEW USER API
router.post("/add-user",async (req,resp)=>{
  const body = req.body;
  try{
    let user = new userCollection(body)
    let result = await user.save();
    resp.send({status:true,oparetion:"add user",data:result})
  }catch(error){
    console.log(error)
    resp.send({status:false,msg:error,oparetion:"add a new user"})
  }
})

// GET ALL USER FOR SHOW ALL USER IN ADMIN PAGE
router.get("/users", async (req,resp)=>{
  try{
    let result = await userCollection.find({});
    resp.send({
      status:true,
      data:result,
      oparetion:"get all user"
    })
  }catch(error){
    console.log(`get all user error => ${error}`)
    resp.send({
      status:false,
      err:error,
      oparetion:"get all user"
    })
  }
})


//DELETE USER ACCOUNT API 
router.delete("/delete-user/:id", async (req,resp)=>{
  const id = req.params.id;
  try{
    let result = await userCollection.deleteOne({_id:id});
    let result2 = await accountCollection.deleteOne({authorId:id})
    resp.send({status:true,data:result,data2:result2})
  }catch(error){
    console.log(error)
    resp.send({
      status:false,
      oparetion:"delete user",
      err:error
    })
  }
});

//UPDATE USER API 
router.put("/update-user/:id", async (req,resp)=>{
  const body = req.body;
  const id = req.params.id;
  try{
    let result = await userCollection.findOneAndUpdate({_id:id},body)
    resp.send({status:true,data:result})
  }catch(error){
    console.log(`user update error => ${error}`)
    resp.send({
      status:false,
      oparetion:"user update",
      err:error
    })
  }
});

                // RAGULAR ROUTES
// GET USER FOR CARD PAGE PROFILE
router.get("/get-user/:id", async (req,resp)=>{
  const id = req.params.id;
  try{
    let result = await userCollection.findOne({_id:id});
    resp.send({
      status:true,
      oparetion:"get user",
      data:result
    })
  }catch(error){
    console.log(`get user error => ${error}`)
    resp.send({
      status:false,
      oparetion:"get user",
      err:error
    })
  }
});

// ADD ACCOUNT API
router.post("/add-account", async (req,resp)=>{
  const body = req.body;
  try{
    let account = new accountCollection(body);
    let result = await account.save()
    resp.send({
      status:true,
      oparetion:"add account",
      data:result
    })
  }catch(error){
    console.log(` add account error => ${error}`)
    resp.send({
      status:false,
      oparetion:"add account",
      err:error
    })
  }
});

// GET ACCOUNT
router.get("/accounts/:id", async(req,resp)=>{
  const uId = req.params.id;
  try{
    let result = await accountCollection.find({authorId:uId});
    resp.send({
      status:true,
      oparetion:"get account",
      data:result
    })
  }catch(error){
    console.log(error)
    resp.send({
      status:false,
      oparetion:"get account",
      err:error
    })
  }
});

//USER LOGIN
router.post("/user-login", async (req,resp)=>{
  const body = req.body
  try{
    let result = await userCollection.findOne(body);
    resp.send({
      status:true,
      oparetion:"login user",
      data:result
    })
    if(result==={}){
      resp.send({
        status:false,
        msg:"User not Faund"
      })
    }
  }catch(error){
    console.log(error)
    resp.send({
      status:false,
      oparetion:"login user",
      err:error
    })
  }
});

//DELETE SOCIAL ACCOUNT API 
router.delete("/delete-account/:id", async (req,resp)=>{
  const id = req.params.id;
  try{
    let result = await accountCollection.deleteOne({_id:id});
    resp.send({status:true,data:result})
  }catch(error){
    console.log(error)
    resp.send({
      status:false,
      oparetion:"delete social account",
      err:error
    })
  }
});

// CHANGE PASSWORD API 
router.put("/change-password", async (req,resp)=>{
  const {id,previousPass,newPass} = req.body
  console.log(id,previousPass,newPass)
  try{
    let result = await userCollection.findOneAndUpdate({_id:id,password:previousPass},{password:newPass})
    resp.send({status:true})
  }catch(error){
    console.log(error)
    resp.send({
      status:false,
      oparetion:"change PASSWORD",
      err:error
    })
  }
});


module.exports = router;