var express		 	= require("express"),
	app		 		= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	passport		= require("passport"),
	flash			= require("connect-flash"),
	LocalStrategy	= require("passport-local"),
	methodOverride	= require("method-override"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	User 			= require("./models/user"),
	seedDB 			= require("./seeds");
	

//requiring routes
var commentRoutes 		=require("./routes/comments"),
	campgroundRoutes 	=require("./routes/campgrounds"),
	indexRoutes 		=require("./routes/index");

//connect mongoose
// mongoose.connect("mongodb://localhost/yelp_camp_v4");
mongoose.connect("process.env.DATABASEURL");
// mongodb://tibi:Infinite14@ds247310.mlab.com:47310/yelpcam-1991
	
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); //make sure this comes begore the passport configuration
// seedDB(); //seed the database

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

//create a custom middleware to pass currentUSer to all routes
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use( "/", indexRoutes);
app.use( "/campgrounds/:id/comments", commentRoutes);
app.use( "/campgrounds", campgroundRoutes);



app.listen(process.env.PORT || 3000, function(){
	console.log('Yelpcamp has started');
});


