const Favourite = require("../models/favourite")
const Home = require("../models/Home")


exports.Addtohome =(req,res,next)=>{
    res.render('host/addHome',{pageTitle:'Add your home',currentPage:'HomeAdded'})
}

exports.PostAddHome=(req,res,next)=>{

  const{housename,location,Rooms,Rating,description}=req.body
  const home=new Home(housename,location,Rooms,Rating,description)
  home.save().then(()=>{
    console.log("Home Saved sucessfully")
  });
  res.render('host/homeAdded',{pageTitle:'Home Added Successfully',currentPage:'HomeAdded'})
}

exports.getHomes=(req,res,next)=>{
    Home.fetchAllHomes().then((houseNames)=>{
      
 res.render('store/home-list',{houseNames:houseNames,pageTitle:'Airbnb Home',currentPage:'Home'})
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
      {pageTitle:'Home Detail',currentPage:'Home', 
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
      const favouriteHomes=houseNames.filter(home=>favourites.includes(home._id.toString()))
      console.log("favourite homes are",favouriteHomes)
res.render('store/favourites',{pageTitle:'My favourites',currentPage:'favourite',favouriteHomes:favouriteHomes})
   } ) 
  }
)
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

