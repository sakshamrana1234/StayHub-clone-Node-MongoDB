const Favourite = require("../models/favourite")
const Booking = require("../models/booking")
const Home = require("../models/Home")


exports.Addtohome =(req,res,next)=>{
    res.render('host/addHome',{pageTitle:'List a residence',currentPage:'HomeAdded',errorMessage:null})
}

exports.PostAddHome=(req,res,next)=>{

  const{housename,location,Rooms,Rating,description}=req.body
  const imageUrls=(req.files || []).map(file=>`/uploads/${file.filename}`)
  if(imageUrls.length < 2){
    return res.status(422).render('host/addHome',{
      pageTitle:'List a residence',
      currentPage:'HomeAdded',
      errorMessage:'Please upload at least 2 residence photos before publishing.'
    })
  }

  const home=new Home(housename,location,Rooms,Rating,description,imageUrls)
  home.save().then(()=>{
    console.log("Home Saved sucessfully")
  });
  res.render('host/homeAdded',{pageTitle:'Home Added Successfully',currentPage:'HomeAdded'})
}

exports.getHomes=(req,res,next)=>{
    Home.fetchAllHomes().then((houseNames)=>{
      
 res.render('store/home-list',{houseNames:houseNames,pageTitle:'Residences',currentPage:'Home'})
    })
  }

  
exports.getHomeDetails=(req,res,next)=>{
    const homeId=req.params.homeId;
   
     Home.findById(homeId).then(home=>{
      if(!home){
       res.redirect("/")
      }
    else{console.log("Home details found yes",home)
     res.render('store/home-detail',
      {pageTitle:'Residence Detail',currentPage:'Home', 
        home:home     
     })}
      
     })
     
  }

 

  exports.postAddFavourite=(req,res,next)=>{
    const homeId=req.body.homeId;
    const fav=new Favourite(homeId)
    fav.save().then(result=>{
      console.log("Added to favourite",result)
    })
    .catch((err)=>{
      console.log("Error in adding to favourite",err)
    })
    .finally(()=>{
      res.redirect('/favourites')
    })
    
  } 


exports.getFavourites=(req,res,next)=>{
  Favourite.getFavourites().then(favourites=>{
    favourites=favourites.map(fav=>fav.houseId.toString())
     Home.fetchAllHomes().then(houseNames=>{
      const favouriteHomes=houseNames.filter(home=>favourites.includes(String(home._id)))
      console.log("favourite homes are",favouriteHomes)
res.render('store/favourites',{pageTitle:'Favourites',currentPage:'favourite',favouriteHomes:favouriteHomes})
   } ) 
  }
)
}

exports.postAddBooking=(req,res,next)=>{
  const homeId=req.body.homeId;
  const booking=new Booking(homeId)
  booking.save()
    .then(result=>{
      console.log("Booked residence",result)
    })
    .catch((err)=>{
      console.log("Error while booking",err)
    })
    .finally(()=>{
      res.redirect('/bookings')
    })
}

exports.getBookings=(req,res,next)=>{
  Booking.getBookings().then(bookings=>{
    bookings=bookings.map(booking=>booking.houseId.toString())
    Home.fetchAllHomes().then(houseNames=>{
      const bookedHomes=houseNames.filter(home=>bookings.includes(String(home._id)))
      res.render('store/bookings',{pageTitle:'Bookings',currentPage:'bookings',bookedHomes:bookedHomes})
    })
  })
}

exports.removeBooking=(req,res,next)=>{
  const homeId=req.params.homeId;
  Booking.deleteById(homeId)
    .catch(error=>{
      console.log('Error while removing booking ', error);
    })
    .finally(()=>{
      res.redirect("/bookings");
    })
}

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/");
  }).catch(error => {
    console.log('Error while deleting ', error);
    
  })
};

  exports.removeFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete from favourite ', homeId);
  Favourite.deleteById(homeId).then(result=> {
    console.log("Deleted from favourite",result)
  }).catch(error => {
    console.log('Error while deleting ', error);
    
  })
  .finally(()=>{
    res.redirect("/favourites");
  })
  
};

