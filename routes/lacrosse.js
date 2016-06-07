var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

//var output;

/* GET home page. */
router.get('/', function(req, res, next) {
  var pteam = {"team": req.param('myteam'), "sport": req.param('sport')};  
  var exist = {"team": req.param('myteam')};
  console.log('This is the db information ' + pteam);
  
    //connect to my database
    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/firstapp';
    // Use connect method to connect to the Server
    
        MongoClient.connect(url, function(err, db) {
            if(err) {
                console.log(err);
            }
            else {
                console.log('Connected to the database successfully!');
                mongoInsert(db, 'clubs', pteam, function(user_res) { 
                    console.log(user_res);               
                    console.log('closing database');
                    db.close();
                });
                
            }        
        });//end of connect
    
        function mongoInsert(db, collection_name, data,cb){
            var collection = db.collection(collection_name);              
                collection.update(
                    {"team": req.param('myteam')},
                    {$set:{"sport": req.param('sport')}}, 
                    {upsert : true}, 
                    function(err, data){
                        if(err){
                            console.log("There is an upsert error" + err);
                        }  
                        else{
                            console.log("the collection updated with " + data);
                        }   
                    }
                    )
                   
                };
  
    res.render('lacrosse', { title: req.param('myteam') });
    });

module.exports = router;
