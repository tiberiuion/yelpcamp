var mongoose = require("mongoose");

//schema setup
var campgroundSchema = mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

//campground object model
module.exports = mongoose.model("Campground", campgroundSchema);