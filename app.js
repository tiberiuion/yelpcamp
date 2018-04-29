var express		 	= require("express"),
	app		 		= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose");


//connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp");

//schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

//campground object model
var Campground = mongoose.model("Campground", campgroundSchema);

//create an entry
// Campground.create(
// 	{
// 		name:'Malvern Hills',
// 		image:"http://unsplash.it/300/300"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("new campground created");
// 			console.log(campground);
// 		}
// 	});
	

app.use(express.static(__dirname + "/www"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.render("home");
});

app.get("/campgrounds", function(req, res){

//get all campgrounds from the db and render file
Campground.find({}, function(err, allCampgrounds){
if(err){
	console.log(err);
} else {
	res.render("campgrounds", {campgrounds: allCampgrounds });
}
});
	// res.render("campgrounds", {campgrounds: campgrounds });
});


//I really have no idea what's happening here
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
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


app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});

app.listen("3000", function(){
	console.log('Yelpcamp has started');
});


