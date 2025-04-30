const passport = require('passport');

const User = require('../models/usersModel');
const Listing = require('../models/listingsModel');

const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');


module.exports.signupUser = wrapAsync (async (req,res)=>{
    const { email, username, password} = req.body;
    const user = new User({ email, username });
    await User.register(user, password);
    res.status(201).json({ success: true, message: 'Registered successfully' , user });
});

module.exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) 
            return next(err);
        if (!user) 
            return next(new ExpressError(401, info?.message || "Password or username is incorrect"));
        req.logIn(user, (err) => {
            if (err) 
                return next(err);
            return res.status(200).json({ success: true, message: 'Logged in successfully', user });
        });
    })(req, res, next);
};

module.exports.logoutUser = (req,res)=>{
    req.logout((err)=>{
        if (err) 
            return next(err);
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
};

module.exports.currentUser = (req,res)=>{
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });  
    }
};

// Wishlist controllers
module.exports.addToWishlist = wrapAsync(async (req, res) => {
    const { listingId } = req.params;
    const userId = req.user._id;

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
        return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    // Update user's wishlist
    const user = await User.findById(userId);
    
    // Check if listing is already in wishlist
    if (user.wishlist.includes(listingId)) {
        return res.status(200).json({ success: true, message: 'Listing already in wishlist' });
    }
    
    // Add to wishlist
    user.wishlist.push(listingId);
    await user.save();
    
    res.status(200).json({ success: true, message: 'Added to wishlist', user });
});

module.exports.removeFromWishlist = wrapAsync(async (req, res) => {
    const { listingId } = req.params;
    const userId = req.user._id;
    
    // Update user's wishlist
    const user = await User.findById(userId);
    
    // Remove from wishlist
    user.wishlist = user.wishlist.filter(id => id.toString() !== listingId);
    await user.save();
    
    res.status(200).json({ success: true, message: 'Removed from wishlist', user });
});

module.exports.getWishlist = wrapAsync(async (req, res) => {
    const userId = req.user._id;
    
    // Get user with populated wishlist
    const user = await User.findById(userId).populate('wishlist');
    
    res.status(200).json({ success: true, data: user.wishlist });
});