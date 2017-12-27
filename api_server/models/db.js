'use strict';
import mongo from 'mongodb';
import util from 'util';
const ObjectID = mongo.ObjectID;
const MongoClient = mongo.MongoClient;

let state = {
  db: null
};

const connect = function(url, done) {
  if (state.db) return done();
  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db;
    done();
  });
};

const get = function() {
  return state.db;
};

const close = function(msg, done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      //state.mode = null;
      done(err);
    })
  }
  console.log(msg);
};


let insertDocument = async function(collectionName, data) {
  try {
    let collection = get().collection(collectionName);
    let result = await collection.insert(data);
    return result; 
  } catch(err) {
    console.log('insert ' + collectionName + ' #####' +  err);
    return err;
  };
};

let findDocumentById = async function(collectionName, id) {
  try {
    let collection = get().collection(collectionName);
    let result = await collection.find({_id: new ObjectID(id)}).toArray()
    return result;
  } catch(err) {
    return err;
  };
};

let findDocuments = async function(collectionName, query) {
  try {
    let collection = get().collection(collectionName);
    let result = await collection.find(query).toArray();
    console.log(query);
    return result;
  } catch(err) {
    return err;
  }
};

let findCollection = async function(collectionName) {
  try {
    let collection = get().collection(collectionName);
    let result = await collection.find().toArray()
    return result;
  } catch(err) {
    return err;
  }
}

let updateDocument = async function(collectionName, id, query) {
  try {
    let collection = get().collection(collectionName);
    let result =  await collection.update({_id: new ObjectID(id)}, query)
    
    return result;
  } catch(err) {
    return err;
  };
};

let removeDocument = async function(collectionName, id) {
  try {
    let collection = get().collection(collectionName);
    let result = await collection.deleteOne({_id: new ObjectID(id)})
    return result;
  } catch(err) {
    return err;
  }
};


MongoClient.connect('mongodb://localhost:27017/pms', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } 
});

process.once('SIGUSR2', function () {
  close('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  close('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function () {
  close('Heroku app termination', function () {
    process.exit(0);
  });
});

export default {connect, close, insertDocument, findDocumentById, findDocuments, findCollection, updateDocument, removeDocument};
