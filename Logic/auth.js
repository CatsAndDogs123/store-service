const bcrypt = require('bcryptjs');

const User = require('../Dal/user');

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findById('5d4ede54d2b3c543883b0d3a');
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.sessio.save(err => {
      console.log(err);
      //redirect??
    });
  } catch (e) {
    console.log(e);
  }
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  try {
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      //return redirect??
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      games: []
    });
    const saveUser = user.save();
    //redirect??
  } catch (e) {
    console.log(e);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    //redirect??
  });
};
