var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static(__dirname + "/www"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [ 
		{name:'John Smith', image:"http://unsplash.it/300/300"},
		{name:'Annabel Kay', image:"http://unsplash.it/301/301"},
		{name:'Amanda Palmer', image:"http://unsplash.it/299/299"},
		{name:'Josh Hammersmith', image:"http://unsplash.it/301/302"},
	];

app.get("/", function(req, res){
	res.render("home");
});

app.get("/campgrounds", function(req, res){

	res.render("campgrounds", {campgrounds: campgrounds });
});


//I really have no idea what's happening here
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
	
});


app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});

app.listen("3000", function(){
	console.log('Yelpcamp has started');
});


