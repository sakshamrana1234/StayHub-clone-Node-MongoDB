const express=require('express')
const hostRouter=express.Router()
const path=require('path')
const fs=require('fs')
const multer=require('multer')
const Homecontroller=require('../controller/homes')

const uploadDir=path.join(__dirname,'..','public','uploads')
fs.mkdirSync(uploadDir,{recursive:true})

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,uploadDir)
  },
  filename:(req,file,cb)=>{
    const safeName=file.originalname.replace(/[^a-zA-Z0-9.]/g,'-')
    cb(null,`${Date.now()}-${Math.round(Math.random()*1e9)}-${safeName}`)
  }
})

const imageUpload=multer({
  storage,
  fileFilter:(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
      cb(null,true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
  limits:{
    files:8,
    fileSize:15*1024*1024,
  }
})

const handleImageUpload=(req,res,next)=>{
  imageUpload.array('images',8)(req,res,(err)=>{
    if(err){
      return res.status(422).render('host/addHome',{
        pageTitle:'List a residence',
        currentPage:'HomeAdded',
        errorMessage:err.code === 'LIMIT_FILE_SIZE'
          ? 'One of the images is too large. Please upload images under 15MB each.'
          : err.message || 'Unable to upload images. Please try again.'
      })
    }
    next()
  })
}

hostRouter.get("/add-home",Homecontroller.Addtohome)
hostRouter.post("/add-home",handleImageUpload,Homecontroller.PostAddHome)
hostRouter.post("/delete-home/:homeId",Homecontroller.postDeleteHome);

exports.hostRouter= hostRouter;   

