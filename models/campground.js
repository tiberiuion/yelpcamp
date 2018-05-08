var mongoose = require("mongoose");

//schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

//campground object model
module.exports = mongoose.model("Campground", campgroundSchema);