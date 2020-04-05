const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://yaron:Aa123456@cluster0-youhq.mongodb.net/2048?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('connected');
      //store connection to db
      _db = client.db();
      callback();
    })
    .catch(err => console.log(err));
};

// access to connection
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.MongoClient = MongoClient;
exports.getDb = getDb;
