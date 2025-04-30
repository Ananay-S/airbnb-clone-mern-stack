// express
const express = require("express");
const router = express.Router({mergeParams : true}); // to get id from server.js

// error handling
const wrapAsync = require("../utils/wrapAsync.js");

// middlewares
const { isLoggedIn, isAuthor } = require("../middlewares/auths.js");
const { validateReview } = require("../middlewares/schema.js");

// controllers
const reviewsController = require("../controllers/reviewsController.js");


// /listings/:id/reviews

router.route("/")
    .get(wrapAsync(reviewsController.getReviews))
    .post(isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewsController.deleteReview));


module.exports = router;