const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../utils/joiSchema.js");

// Define allowed categories
const ALLOWED_CATEGORIES = [
    "Cabin", "Pool", "Forest", "Hiking", "Castle", "Beach", 
    "Top cities", "Arctic", "Hill station", "Bed & breakfast", 
    "Camping", "Golfing", "Spa", "Surfing", "Boats", "Safari", 
    "Ski-in", "Camper vans", "Monuments"
];

// Schema validations


module.exports.validateListing = (req,res,next) => {
    // First validate with Joi schema
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let messages = error.details.map((err) => err.message).join(",");
        throw new ExpressError(400, messages);
    }
    // Then validate categories against allowed list
    if (req.body.listing && req.body.listing.categories) {
        const invalidCategories = req.body.listing.categories.filter(
            category => !ALLOWED_CATEGORIES.includes(category)
        );
        
        if (invalidCategories.length > 0) {
            throw new ExpressError(400, `Invalid categories: ${invalidCategories.join(', ')}`);
        }
    }
    // Validate image count
    if (req.body.listing && req.body.listing.images && req.body.listing.images.length > 3) {
        throw new ExpressError(400, "Maximum 3 images are allowed");
    }
    
    next();
};

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let messages = error.details.map((err) => err.message).join(",");
        throw new ExpressError(400, messages);
    } else {
        next();
    }
};