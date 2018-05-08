var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("")
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

//remove all campgrounds
function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err)
		}
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed), function(err, campground){
				if(err){
					console.log(err);
				} else	{
					console.log("added a new campground");
					//create a comment
					Comment.create(
					{
						text: "this place is great but I with thee was internet",
						author: "Bob"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created a new comment");
						};
					});
				};
			};
		});
	});
};

//add a few comments


module.exports = seedDB;