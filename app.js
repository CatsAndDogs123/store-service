const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const mongoConnect = require('./util/database').MongoClient;
const session = require('express-session');
const mongoose = require('mongoose');
const mongoDBStore = require('connect-mongodb-session')(session);

const User = require('./Dal/user');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());

const store = new mongoDBStore({
  uri: 'mongodb+srv://yaron:Aa123456@cluster0-youhq.mongodb.net/shop',
  collection: 'sessions',
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);

//user
app.use((req, res, next) => {
  if (req.session.user) {
    return next();
  }
  User.findById('5d4ede54d2b3c543883b0d3a').then((user) => {
    req.user = user;
    next();
  });
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

//TODO Add swagger

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404)); // next - go to nexg middlware
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log(process.env.CONNECTION_CONFIG, ' connnn');
mongoose.connect(process.env.CONNECTION_CONFIG).then((res) => {
  app.listen(3002, () => {
    console.log('running on port: ', 3002);
  });
});

module.exports = app;
