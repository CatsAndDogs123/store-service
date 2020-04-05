const Product = require('../Dal/product');
const Counter = require('../Dal/counter');

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.addProductData.title;
  const price = req.body.addProductData.price;
  const description = req.body.addProductData.description;
  const product = new Product({
    title: title,
    price: price,
    descreption: description,
    userId: req.user
  });
  console.log(product);
  const saveProd = await product.save();
  res.send(product._id);
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  const product = await Product.findById(prodId);
  product.title = updatedTitle;
  product.price = updatedPrice;
  product.description = updatedDesc;
  const result = await product.save();
  res.send('Edited Product');
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.send(products);
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const deleteProd = await Product.findByIdAndRemove(prodId);
  res.send('Destroyed Product');
};

// exports.getGame = async (req, res, next) => {
//   const gameId = req.params.id;
//   const game = await Game.findById(gameId);
//   res.send(game);
// };
//
// exports.postGame = async (req, res, next) => {
//   console.log('in');
//   let currentGameId;
//   await Counter.count(async (err, count) => {
//     console.log('done counting');
//     if (count === 0) {
//       const gameCounter = new Counter({});
//       const createGamesCounter = await gameCounter.save();
//       currentGameId = 1;
//     } else {
//       await Counter.findOne({ _id: 'Games' }).then(async gameCounter => {
//         currentGameId = gameCounter.sequence_value += 1;
//         currentGameId;
//         console.log('AHHHHHHHHHHHHH1', currentGameId);
//         const updateGamesCounter = await gameCounter.save();
//       });
//     }

//     console.log('AHHHHHHHHHHHHH2', currentGameId);
//     const listOfMovesAndNumber = req.body.listOfMovesAndNumber;
//     const board = req.body.board;
//     const score = req.body.score;
//     const name = req.body.name;
//     const date = req.body.date;
//     const isEndGame = req.body.isEndGame;
//     console.log('BEFORE SAVEEEE');
//     const game = new Game({
//       _id: currentGameId,
//       listOfMovesAndNumber: listOfMovesAndNumber,
//       board: board,
//       score: score,
//       name: name,
//       date: date,
//       isEndGame: isEndGame
//     });
//     const createdGame = await game.save();
//     //new
//     await req.user.addToGames(game);
//     console.log('AFTER SAVEEE');
//     res.send({ currentGameId });
//   });
//   //check counter
// };

// exports.postUpdatedGame = async (req, res, next) => {
//   const gameId = req.body.id;
//   console.log('GAME IDDDDDDDDDDDDDDDDDDDDD ', gameId);
//   const listOfMovesAndNumber = req.body.listOfMovesAndNumber;
//   const board = req.body.board;
//   const score = req.body.score;
//   const name = req.body.name;
//   const date = req.body.date;
//   const isEndGame = req.body.isEndGame;
//   await Game.findById(gameId).then(async game => {
//     game.listOfMovesAndNumber = listOfMovesAndNumber;
//     game._id = gameId;
//     game.board = board;
//     game.score = score;
//     game.name = name;
//     game.date = date;
//     game.isEndGame = isEndGame;
//     console.log(new Date());
//     const saveGame = await game.save();
//     console.log(new Date());
//     console.log('before sending back');
//     res.send('updated');
//   });
// };

// exports.deleteGame = async (req, res, next) => {
//   const gameId = req.params.id;
//   const deltedGame = await Game.findByIdAndRemove(gameId);
//   await req.user.removeFromGames(gameId);
//   res.send('deleted');
//   console.log('deleted');
// };
