const express=require('express')
const path=require('path')
const {hostRouter}=require("./routes/hostRouter")
const userRouter=require("./routes/userRouter")


const app=express()
app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded())
app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
})


app.use(userRouter)
app.use("/host",hostRouter);
app.use(express.static(path.join(__dirname,'public')))
const {PageNotFound}=require('./controller/errors')
const {MongoConnect} = require('./utils/databaseUtil')
app.use(PageNotFound)


const PORT=3000;
MongoConnect(()=>{
app.listen(PORT,()=>{
console.log(`Hello budyy here it's running http://localhost:${PORT}`)
})
})
