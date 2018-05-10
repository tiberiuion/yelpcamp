var express		 	= require("express"),
	app		 		= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	Campground 		= require("./models/campground"),
	seedDB 			= require("./seeds");

//connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp_v3");
	

app.use(express.static(__dirname + "/www"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
seedDB();

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){

	//get all campgrounds from the db and render file
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			console.log("added campground")
			res.render("campgrounds/index", {campgrounds: allCampgrounds });
		};
	});
});

//INDEX - show all campgrounds
//I really have no idea what's happening here
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
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
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new")
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else {
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		};
	});
});

//============================
// Comments routes
//============================

app.get("/campgrounds/:id/comments/new", function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		};
	});
});



app.listen("3000", function(){
	console.log('Yelpcamp has started');
});


