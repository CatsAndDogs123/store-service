const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: false
    },
    descreption: {
      type: String,
      required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database');

// const ObjectId = mongodb.ObjectId;

// class Game {
//   constructor(listOfMovesAndNumber, board, score, name, date, isEndGame, id) {
//     this.listOfMovesAndNumber = listOfMovesAndNumber;
//     this.board = board;
//     this.score = score;
//     this.name = name;
//     this.date = date;
//     this.isEndGame = isEndGame;
//     this._id = id ? new ObjectId(id) : null;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection('games').updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('games').insertOne(this);
//     }
//     return dbOp.then(res => console.log(res));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('games')
//       .find()
//       .toArray()
//       .then(games => {
//         console.log(games);
//         return games;
//       });
//   }

//   static findById(gameId) {
//     const db = getDb();
//     return db
//       .collection('games')
//       .findOne({ _id: new ObjectId(gameId) })
//       .then(product => {
//         console.log(product);
//         return product;
//       });
//   }

//   static deleteById(gameId) {
//     const db = getDb();
//     return db
//       .collection('games')
//       .deleteOne({ id: new ObjectId(gameId) })
//       .then(res => {
//         console.log('deleted');
//       });
//   }
// }

// module.exports = Game;
