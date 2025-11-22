const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtil");

module.exports= class Favourite{
  constructor(houseId){
  this.houseId=houseId;
}
    save(){
      const db=getDb();
      return db.collection('favourites').findOne({houseId:this.houseId}).then(
        existingFav=>{
          if(!existingFav)
            {return db.collection('favourites').insertOne(this); 
       }
      
        return Promise.resolve()
      }) 
    }
      

     static getFavourites(id,callback){
    
    const db=getDb();
      return db.collection('favourites').find().toArray();
     }

   
  static deleteById(delHomeId) {
    const db = getDb();
    return db.collection('favourites').deleteOne({houseId:String(delHomeId)});
  }
};