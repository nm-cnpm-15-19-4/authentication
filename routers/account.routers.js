var express = require('express');
var router = express.Router();
const accountController = require('../controller/account.controller');
const verifyToken = require('../middleware/auth');

/* GET users listing. */
router.get("/", (req, res) => {
  res.render('Login', {layout: 'login.hbs'});
});

router.get("/forgotpassword", (req, res) => {
  res.render('Password', {layout: 'password.hbs'});
});

router.get("/profile",verifyToken, accountController.profile);

router.get("/resetpassword/:token", (req, res) => {
  res.render('Password', {layout: 'resetpassword.hbs'});
});

router.post("/register", accountController.register);

router.post("/login",accountController.login);

router.post("/forgotpassword", accountController.forgotpassword);

//router.put("/profile", accountController.profile);

router.get("/logout", accountController.logout);

module.exports = router;