var express = require("express");
var app = express();
app.use(express.static(__dirname + "/www"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/campgrounds", function(req, res){
	var campground = [ 
		{name:'John Smith', image:"http://unsplash.it/300/300"},
		{name:'Annabel Kay', image:"http://unsplash.it/301/301"},
		{name:'Amanda Palmer', image:"http://unsplash.it/299/299"},
		{name:'Josh Hammersmith', image:"http://unsplash.it/301/302"},
	];

	res.render("campgrounds", {campgrounds: campground });
});

app.listen("3000", function(){
	console.log('Yelpcamp has started');
});


