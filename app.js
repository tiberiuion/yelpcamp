var express		 	= require("express"),
	app		 		= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	User 			= require("./models/user"),
	seedDB 			= require("./seeds");

//connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp_v3");
	
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Momo and Mimi are the best cats",
	resave: false, 
	saveUninitialized: false
	}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){

	//get all campgrounds from the db and render file
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			console.log("added campground");
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

app.get("/campgrounds/:id/comments/new", isLoggedIn ,function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		};
	});
});

app.post("/campgrounds/:id/comments",isLoggedIn ,function(req, res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	//create new comment
	//connect new comment to campground
	//redirect campground showpage
});


//===========
//AUTH ROUTES
//===========
//show register form
app.get("/register", function (req, res) {
	res.render("register");
});

//handle signup logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function (err, user) {
		if(err){
			console.log(err);
			return res.render("register")
		}
		//how does this work???????????????????????????????
		//also the below is the same as the middleware that's running in the login post route
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form
app.get("/login", function (req, res) {
	res.render("login");
});

//we're using a MIDDLEWARE, it's the bit between the route and the usual req,res callback function
app.post("/login", passport.authenticate("local", 
	{
		successRedirect:"/campgrounds",
		failureRedirect: "/login",
	}), function (req, res) {

});

//add logout route
app.get("/logout", function (req, res) {
	//this comes from the packages we have installed
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


app.listen("3000", function(){
	console.log('Yelpcamp has started');
});


