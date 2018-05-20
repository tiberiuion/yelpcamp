var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Worcester",
		image: "http://unsplash.it/400/400",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea veniam, nostrum, nihil aliquam perferendis cupiditate laudantium, quam molestiae, tempore porro voluptate inventore aperiam quia recusandae molestias atque. Magnam, quibusdam, facere."
	},

	{
		name: "Malvern",
		image: "http://unsplash.it/400/401",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea veniam, nostrum, nihil aliquam perferendis cupiditate laudantium, quam molestiae, tempore porro voluptate inventore aperiam quia recusandae molestias atque. Magnam, quibusdam, facere."
	},

	{
		name: "Cheltenham",
		image: "http://unsplash.it/401/400",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea veniam, nostrum, nihil aliquam perferendis cupiditate laudantium, quam molestiae, tempore porro voluptate inventore aperiam quia recusandae molestias atque. Magnam, quibusdam, facere."
	}
];


function seedDB(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		}
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added campground");
					//create a comment
					Comment.create(
					{
						text: "This place is great",
						author: "Homer"
					}, function (err, comment){
						if (err) {
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("created new comment");	
						}
						
					});
				}
			});
		});
	});
	
	//add a few comments
}


module.exports = seedDB;