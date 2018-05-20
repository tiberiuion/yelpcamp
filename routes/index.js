var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function (req, res){
	res.render("landing");
});


//===========
//AUTH ROUTES
//===========

//show register form
router.get("/register", function (req, res) {
	res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function (err, user) {
		if(err){
			console.log(err);
			return res.render("register");
		}
		//how does this work???????????????????????????????
		//also the below is the same as the middleware that's running in the login post route
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function (req, res) {
	res.render("login");
});

//handling login logic
//we're using a MIDDLEWARE, it's the bit between the route and the usual req,res callback function
router.post("/login", passport.authenticate("local", 
	{
		successRedirect:"/campgrounds",
		failureRedirect: "/login",
	}), function (req, res) {

});

//logout route
router.get("/logout", function (req, res) {
	//this comes from the packages we have installed
	req.logout();
	res.redirect("/campgrounds");
});

//middleware

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
