var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req, res){
	console.log(req.user);

	//get all campgrounds from the db and render file
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			console.log("added campground");
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user });
		}
	});
});

//CREATE
//I really have no idea what's happening here
router.post("/", isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username:req.user.username
	};
	var newCampground = {name: name, image: image, description: description, author: author};
	console.log(req.user);
	// create a new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		}else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn,function(req, res){
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else {
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	//redirect to the show page
});

//middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}



module.exports =  router;