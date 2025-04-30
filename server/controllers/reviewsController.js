const Listing = require("../models/listingsModel.js");
const Review = require("../models/reviewsModel.js");

module.exports.getReviews = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}});
    res.status(200).json({ success: true, reviews: listing.reviews }); 
}

module.exports.createReview = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    res.status(201).json({ success: true, message: "Review Created" }); 
};

module.exports.deleteReview = async (req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.status(201).json({ success: true, message: "Review Deleted" }); 
};