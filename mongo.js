const MongoClient = require('mongodb').MongoClient
//const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'banco'


// Use connect method to connect to the Server
MongoClient.connect(url,{ useNewUrlParser: true },function(err,client) {
  //assert.equal(null, err);
  //console.log("Connected successfully to server")

   const db = client.db(dbName)
  
   //insertDocuments(db, function() {
     findDocuments(db, function() {
      client.close()
     })
   // })
})


const insertDocuments = function(db, callback) {
    // Insert some documents
    db.collection('logs').insertOne( {a : 'Pitanga'} , function(err, result) {

      //console.log("Inserted 1 documents into the collection")
      callback(result)
    });
  }

  const findDocuments = function(db, callback) {

    // Find some documents
    db.collection('logs').find({}).toArray(function(err, docs) {
      //assert.equal(err, null)
      console.log("Encontrados os seguintes registros")
      console.log(docs)
      callback(docs)
    })
  }