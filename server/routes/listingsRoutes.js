// express
const express = require("express");
const router = express.Router();

// error handling
const wrapAsync = require("../utils/wrapAsync.js");

// middlewares
const { isLoggedIn, isOwner } = require("../middlewares/auths.js");
const { validateListing } = require("../middlewares/schema.js");

// controller
const listingsController = require("../controllers/listingsController.js");


// /listings 

router.route("/")
    .get(wrapAsync(listingsController.getListings))
    .post(isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

router.route("/:id") // by id
    .get(wrapAsync(listingsController.getListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingsController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));


module.exports = router;