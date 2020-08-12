const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callBack) => {
  MongoClient.connect(
    'mongodb+srv://shopUser:zaq1xsw2@shop-cluster.ex40w.mongodb.net/shopApp?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  )
    .then((client) => {
      _db = client.db();
      console.log('connected');
      callBack();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
