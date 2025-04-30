const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./reviewsModel.js");

// Define allowed categories
const ALLOWED_CATEGORIES = [
    "Cabin", "Pool", "Forest", "Hiking", "Castle", "Beach", 
    "Top cities", "Arctic", "Hill station", "Bed & breakfast", 
    "Camping", "Golfing", "Spa", "Surfing", "Boats", "Safari", 
    "Ski-in", "Camper vans", "Monuments"
];

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    images : {
        type : [String],
        validate: {
            validator: function(v) {
                return v.length <= 3; // Maximum 3 images
            },
            message: props => `${props.value} exceeds the limit of 3 images!`
        },
        default: ["https://res.cloudinary.com/dsbsmaj3b/image/upload/v1744955160/c3c11d24-a23b-4ca0-a60e-3a7f88f8ce15_bcgaze.avif"]
    },
    categories: {
        type: [String],
        validate: {
            validator: function(v) {
                return v.every(category => ALLOWED_CATEGORIES.includes(category));
            },
            message: props => `${props.value} contains categories that are not allowed!`
        }
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if (listing) {
        await Review.deleteMany({_id : {$in : listing.reviews}})
    }
});

module.exports = mongoose.model("Listing", listingSchema);