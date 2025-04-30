const Listing = require("../models/listingsModel.js");

module.exports.getListings = async (req,res)=>{
    // Build filter object based on query parameters
    const filter = {};
    
    // Handle search query
    if (req.query.q) {
        // Search in title, description, and location using regex for partial matches
        filter.$or = [
            { title: { $regex: req.query.q, $options: 'i' } },
            { description: { $regex: req.query.q, $options: 'i' } },
            { location: { $regex: req.query.q, $options: 'i' } },
            { country: { $regex: req.query.q, $options: 'i' } }
        ];
    }
    
    // Handle category filter
    if (req.query.category) {
        filter.categories = req.query.category;
    }
    
    const listings = await Listing.find(filter);
    res.status(200).json({ success: true, data: listings });
};

module.exports.getListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "reviews", populate: {path: "author"}})
        .populate("owner");
    res.status(200).json({ success: true, data: listing });
};

module.exports.createListing = async (req,res)=>{    
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    if (listing.images.length === 0) {
        listing.images = ["https://res.cloudinary.com/dsbsmaj3b/image/upload/v1744955160/c3c11d24-a23b-4ca0-a60e-3a7f88f8ce15_bcgaze.avif"];
    }
    await listing.save();
    res.status(201).json({ success: true, message: "Listing Created", data: listing }); 
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.status(200).json({ success: true, message: "Listing Updated", data: updatedListing });
};

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Listing Deleted"});
};
