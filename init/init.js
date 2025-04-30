const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Enable mongoose debugging
mongoose.set('debug', true);
mongoose.set('strictQuery', false);

// Connect to MongoDB with better options
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb-clone-test";

// Define a simple User schema for initialization
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }]
});

// Define a simple Listing schema for initialization
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String],
    categories: [String],
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

// Define a simple Review schema for initialization
const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection URL:', MONGO_URL);
        
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB Connected successfully');
        
        // Create models after connection is established
        const User = mongoose.model("User", userSchema);
        const Listing = mongoose.model("Listing", listingSchema);
        const Review = mongoose.model("Review", reviewSchema);
        
        return { User, Listing, Review };
    } catch (error) {
        console.error('MongoDB connection error:', error);
        console.log('Please make sure MongoDB is running and accessible');
        console.log('You can check MongoDB status in Services or using MongoDB Compass');
        process.exit(1);
    }
};

// Read data from separate data files
const usersData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/users.json'), 'utf-8')
);

const listingsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/listings.json'), 'utf-8')
);

const reviewsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/reviews.json'), 'utf-8')
);

// Storage for created document IDs
const userIdMap = new Map();
const listingIdMap = new Map();

// Function to clear all collections
const clearCollections = async (models) => {
    try {
        console.log('Starting to clear collections...');
        
        // Drop database instead of individual collections
        await mongoose.connection.dropDatabase();
        console.log('Database cleared successfully');
    } catch (err) {
        console.error('Error clearing database:', err);
        console.error('Error details:', err.message);
        process.exit(1);
    }
};

// Function to seed users
const seedUsers = async (models) => {
    const { User } = models;
    try {
        const users = [];
        console.log('Starting to seed users...');
        for (const userData of usersData.users) {
            console.log(`Creating user: ${userData.username}`);
            const user = new User({
                username: userData.username,
                email: userData.email,
                wishlist: []
            });
            
            await user.save();
            userIdMap.set(userData._id, user._id);
            users.push(user);
            
            // Add a small delay between users
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        console.log(`${users.length} users seeded successfully`);
        return users;
    } catch (err) {
        console.error('Error seeding users:', err);
        console.error('Error details:', err.message);
        process.exit(1);
    }
};

// Function to seed listings
const seedListings = async (models) => {
    const { Listing } = models;
    try {
        const listings = [];
        console.log('Starting to seed listings...');
        for (const listingData of listingsData.listings) {
            console.log(`Creating listing: ${listingData.title}`);
            const listing = new Listing({
                title: listingData.title,
                description: listingData.description,
                images: listingData.images,
                categories: listingData.categories,
                price: listingData.price,
                location: listingData.location,
                country: listingData.country,
                owner: userIdMap.get(listingData.owner),
                reviews: []
            });
            await listing.save();
            listingIdMap.set(listingData._id, listing._id);
            listings.push(listing);
            
            // Add a small delay between listings
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        console.log(`${listings.length} listings seeded successfully`);
        return listings;
    } catch (err) {
        console.error('Error seeding listings:', err);
        console.error('Error details:', err.message);
        process.exit(1);
    }
};

// Function to seed reviews
const seedReviews = async (models) => {
    const { Review, Listing } = models;
    try {
        const reviews = [];
        console.log('Starting to seed reviews...');
        for (const reviewData of reviewsData.reviews) {
            console.log(`Creating review for listing: ${reviewData.listing}`);
            const review = new Review({
                comment: reviewData.comment,
                rating: reviewData.rating,
                author: userIdMap.get(reviewData.author),
                createdAt: new Date()
            });
            await review.save();
            reviews.push(review);
            
            await Listing.findByIdAndUpdate(
                listingIdMap.get(reviewData.listing),
                { $push: { reviews: review._id } }
            );
            
            // Add a small delay between reviews
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        console.log(`${reviews.length} reviews seeded successfully`);
        return reviews;
    } catch (err) {
        console.error('Error seeding reviews:', err);
        console.error('Error details:', err.message);
        process.exit(1);
    }
};

// Main function to seed the database
const seedDatabase = async () => {
    let models;
    try {
        models = await connectDB();
        
        await clearCollections(models);
        await seedUsers(models);
        await seedListings(models);
        await seedReviews(models);
        
        console.log('Database seeded successfully!');
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        console.error('Error details:', err.message);
        try {
            await mongoose.connection.close();
        } catch (closeErr) {
            console.error('Error closing MongoDB connection:', closeErr);
        }
        process.exit(1);
    }
};

// Run the seeding process
seedDatabase();
