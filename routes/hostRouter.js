const express=require('express')
const hostRouter=express.Router()
const path=require('path')
const Homecontroller=require('../controller/homes')
hostRouter.get("/add-home",Homecontroller.Addtohome)
hostRouter.post("/add-home",Homecontroller.PostAddHome)
hostRouter.post("/delete-home/:homeId",Homecontroller.postDeleteHome);

exports.hostRouter= hostRouter;   

