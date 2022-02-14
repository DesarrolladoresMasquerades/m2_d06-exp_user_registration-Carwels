const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const saltRounds = 10;
const bcrypt = require('bcrypt');

//implicit that its /auth/signup
router.route('/signup', )
.get((req, res) => {
	res.render('signup');
})
.post((req, res) => {
	const username = req.body.username;
	//*1- can be let password =
	const password = req.body.password;

	//Check the form is NOT empty
	if(!username || !password) {
		res.render("signup", {errorMessage: "All fields are required"});
	}
//looking in DB if user exists
	User.findOne({ username })
	.then(user => {
	//kill switch, if the user exists then it kills the function
		if(user && user.username)
		{res.render("signup", {errorMessage: "User already taken"})}

//here we use bcrypt
		const salt = bcrypt.genSaltSync(saltRounds)
		//*1- then here would be password = bcrypt.hashSync(password,salt)
		const hashedPwd = bcrypt.hashSync(password, salt)
		//*1- Then here would be User.create({username, password) In this way would be a cleaner code
		User.create({username, password: hashedPwd})
		.then( () => res.redirect("/index"))
	})
})

//implicit that its /auth/login
router.get('/login', (req, res, next) => {
	res.render('login');
});

router.get('/profile', (req, res) => {
	res.render('profile');
});

module.exports = router;
