const Product = require('../Dal/product');
const Order = require('../Dal/order');

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.send(products);
};
//prud details
exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  res.send(product);
};

exports.getCart = async (req, res, next) => {
  const user = await req.user.populate('cart.items.productId').execPopulate();
  const products = user.cart.items;
  res.send(products);
};

exports.postProductToCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  const result = await req.user.addToCart(product);
  res.send('Posted Product To Cart');
};

exports.postProductReduceCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  const result = await req.user.reduceFromCart(product);
  res.send('Posted Product To Cart');
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const result = req.user.removeFromCart(prodId);
  res.send('Delete Product From Cart');
};

exports.postOrder = async (req, res, next) => {
  const user = await req.user.populate('cart.items.productId').execPopulate();
  const products = user.cart.items.map(i => {
    return { quantity: i.quantity, product: { ...i.productId._doc } };
  });

  const order = new Order({
    user: {
      email: req.user.email,
      userId: req.user
    },
    products: products
  });
  const result = await order.save();

  const clearCart = await req.user.clearCart();

  res.send('Posted Orders');
};

exports.getOrders = async (req, res, next) => {
  const orders = await Order.find({ 'user.userId': req.user._id });
  res.send(orders);
};

exports.getFilteredProducts = async (req, res, next) => {
  const title = req.query.title;
  const products =
    title === undefined
      ? await Product.find()
      : await Product.find({ title: new RegExp(`^${title}`) });
  res.send(products);
};
