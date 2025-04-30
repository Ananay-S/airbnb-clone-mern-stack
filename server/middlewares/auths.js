const WrapAsync = require("../utils/wrapAsync");

const Listing = require("../models/listingsModel");
const Review = require("../models/reviewsModel");

module.exports.isLoggedIn = (req,res,next)=>{
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You must be logged in' });
  }
  next();
}

module.exports.isOwner = WrapAsync(async (req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if (!listing) return res.status(404).json({ message: 'Not Found' });
  if (!listing.owner._id.equals(req.user._id)) {
    return res.status(403).json({ message: 'Permission denied' });
  }
  next();
});

module.exports.isAuthor = WrapAsync(async (req,res,next)=>{
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if (!review) return res.status(404).json({ message: 'Not Found' });
  if (!review.author._id.equals(req.user._id)) {
    return res.status(403).json({ message: 'Permission denied' });
  }
  next();
});