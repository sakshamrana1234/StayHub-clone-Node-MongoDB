const express=require('express')
const userRouter=express.Router()
const userHomes=require('../controller/homes')
userRouter.get("/",userHomes.getHomes) 
userRouter.get("/homes/:homeId",userHomes.getHomeDetails)
userRouter.get("/favourites",userHomes.getFavourites)  
userRouter.post("/favourites",userHomes.postAddFavourite) 
userRouter.post("/favourites/:homeId/delete", userHomes.removeFavourite);
userRouter.get("/bookings",userHomes.getBookings)
userRouter.post("/bookings",userHomes.postAddBooking)
userRouter.post("/bookings/:homeId/delete", userHomes.removeBooking);
  module.exports=userRouter;
  
