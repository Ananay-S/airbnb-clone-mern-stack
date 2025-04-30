// express
const express = require("express");
const router = express.Router();

// middlewares
const { isLoggedIn } = require("../middlewares/auths.js");

// controllers
const usersController = require("../controllers/usersController.js");


// /users

router.post('/signup', usersController.signupUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);
router.get('/current', usersController.currentUser);

// (wishlist)
router.get('/wishlist', isLoggedIn, usersController.getWishlist);
router.post('/wishlist/:listingId', isLoggedIn, usersController.addToWishlist);
router.delete('/wishlist/:listingId', isLoggedIn, usersController.removeFromWishlist);


module.exports = router;