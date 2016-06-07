var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


/* GET home page. */
  router.get('/', function(req, res, next) {
  console.log('lets begin');
  
    //connect to my database
    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/firstapp';
    // Use connect method to connect to the Server

    MongoClient.connect(url, function(err, db) {
            if(err) {
                console.log(err);
            }
            else {
                console.log('Connected to the database successfully - printdb!');
            
                mongoPrint(db, 'clubs', function(user_res) { 
                    console.log(user_res);
                    console.log('closing database');
                    db.close();
                });
                
            }
            
            console.log('Disconnected from database successfully');
     });//end of connect
        
        function mongoPrint(db, collection_name,cb){
            var collection = db.collection(collection_name);              
            var cursor = collection.find({}).toArray(function(err, data){
                if(err){
                    console.log(err);
                }else{
                    res.render('printdb', {data});       
                };
            })
        };
                
            
            
            /*cursor.each(function(err, doc){    
                    if(err){
                        console.log("There is an upsert error" + err);
                    }  
                    if(doc){
                        console.log("Item in database " + doc.team + " " + doc.sport);
                        res.render('printdb', {team: doc.team, sport:  doc.sport});
                    }                   
                    })
            };*/
            
    
});

module.exports = router;