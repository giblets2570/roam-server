// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our agent model
// module.exports allows us to pass this to other files when it is called

var venueSchema = mongoose.Schema({

	name: String,
	rating: String,
	type:String,

	coordinates: {
		latitude: Number,
		longitude: Number
	},

	closingTimes:{
		monday: String,
		tuesday: String,
		wednesday: String,
		thursday: String,
		friday: String,
		saturday: String,
		sunday: String
	},

	events:[
		{
			name: String,
			price: Number,
			time: String,
			date: Date
		}
	],

	reviews: [
		{
			text: String,
			date: Date
		}
	]
});

venueSchema.methods.withinBounds = function(SWLat, SWLng, NELat, NELng, Lat, Lng) {
	if(SWLng <= Lng && NELng >= Lng){
		if(SWLat <= Lat && NELat >= Lat){
			return true;
		}
	}
    return false;
};

module.exports = mongoose.model('Venue', venueSchema);