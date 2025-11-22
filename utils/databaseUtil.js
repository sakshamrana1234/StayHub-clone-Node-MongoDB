const mongo=require('mongodb')
const MongoClient=mongo.MongoClient;
const URL="mongodb+srv://ranasaksham334:hello123@mernstack.iitvfck.mongodb.net/?retryWrites=true&w=majority&appName=MERNStack"
let _db;
const MongoConnect=(callback)=>{MongoClient.connect(URL).then((client)=>{
callback();
_db=client.db('airbnb');
})
.catch(err=>{console.log("Error while connecting:",err);  
})
;}

const getDb=()=>{
  if(!_db){
    throw new Error("Mongo not connnected")
  }
  return _db;
}
exports.MongoConnect=MongoConnect;
exports.getDb=getDb;