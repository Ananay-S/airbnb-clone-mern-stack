// react
import { useEffect, useState, useCallback } from "react";

// react router
import { useNavigate, useLocation } from "react-router-dom";

// services
import { getListings, getListingsBySearch, getListingsByCategory } from "../../services/listingsService";

// context
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

// toast
import { toast } from 'react-hot-toast';

// includes
import Navbar from "../../components/includes/Navbar";
import Footer from "../../components/includes/Footer";
// components
import ExplorePageNavbar from "../../components/ExplorePage/ExplorePageNavbar";
import WishlistButton from "../../components/Wishlist/WishlistButton";


const ExplorePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { wishlistItems } = useWishlist();

    // Explore page
    const [listings, setListings] = useState([]);
    const [searchParams, setSearchParams] = useState({
        query: '',
        category: '',
        wishlist: false
    });
    const [searchTitle, setSearchTitle] = useState('');

    const handleShowListing = (id) => {
        navigate('/show', {state: {id}});
    };

    // Parse URL parameters on location change
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        const category = params.get('category');
        const wishlist = params.get('wishlist') === 'true';
        
        setSearchParams({
            query: query || '',
            category: category || '',
            wishlist: wishlist
        });
        
        // Set the page title based on search parameters
        if (query) {
            setSearchTitle(`Search results for "${query}"`);
        } else if (category) {
            setSearchTitle(`${category} listings`);
        } else if (wishlist) {
            setSearchTitle('Your Wishlist');
        } else {
            setSearchTitle('');
        }
    }, [location.search]);

    // Function to fetch listings based on search parameters
    const fetchListings = useCallback(async () => {
        toast.loading('Loading...', { id: 'loading' });
        let response;
        
        if (searchParams.wishlist) {
            // If we're in wishlist mode, but user isn't logged in, redirect to login
            if (!user) {
                toast.dismiss('loading');
                navigate('/login');
                return;
            }
            // Use wishlistItems directly from context
            setListings(wishlistItems);
            toast.dismiss('loading');
            return;
        } else if (searchParams.query) {
            response = await getListingsBySearch(searchParams.query);
        } else if (searchParams.category) {
            response = await getListingsByCategory(searchParams.category);
        } else {
            response = await getListings();
        }
        setListings(response.data.data);
        toast.dismiss('loading');
    }, [searchParams, user, navigate, wishlistItems]);

    // Fetch listings when parameters change
    useEffect(() => {
        // Scroll to top only on initial page load or when search params change
        // but not when wishlist items change
        window.scrollTo(0, 0);
        fetchListings();
    }, [searchParams, fetchListings]);

    return (
        <>
            <div id="body">
                <Navbar/>   
                <ExplorePageNavbar/>
                <div id="main">
                    {searchTitle && (
                        <div className="container mt-3">
                            <h2>{searchTitle}</h2>
                            <p>{listings.length} {listings.length === 1 ? 'listing' : 'listings'} found</p>
                        </div>
                    )}
                    <div className="row row-cols-1 d-flex justify-content-center">
                        {listings.length > 0 ? (
                            listings.map((listing) => (
                                <div className="card ep-card col" key={listing._id}>
                                    <a className="card-link ep-card-link">
                                        <div id={`carouselExplore${listing._id}`} className="carousel slide carousel-fade" data-bs-ride="carousel">
                                            {/* Wishlist Button */}
                                            <WishlistButton listingId={listing._id} />
                                            
                                            {/* Carousel indicators */}
                                            {listing.images && listing.images.length > 1 && (
                                                <div className="carousel-indicators">
                                                    {listing.images.map((_, index) => (
                                                        <button 
                                                            key={index}
                                                            type="button" 
                                                            data-bs-target={`#carouselExplore${listing._id}`} 
                                                            data-bs-slide-to={index} 
                                                            className={index === 0 ? "active" : ""}
                                                            aria-current={index === 0 ? "true" : "false"}
                                                            aria-label={`Slide ${index + 1}`}
                                                        ></button>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            {/* Carousel items */}
                                            <div className="carousel-inner">
                                                {listing.images && listing.images.map((image, index) => (
                                                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                        <img src={image} className="d-block w-100 card-img-top ep-card-img" alt={`Listing ${index + 1}`} onClick={() => handleShowListing(listing._id)}/>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Carousel controls - only if multiple images */}
                                            {listing.images && listing.images.length > 1 && (
                                                <>
                                                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExplore${listing._id}`} data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExplore${listing._id}`} data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                        <div className="card-body" onClick={() => handleShowListing(listing._id)}>
                                            <h5 className="card-title">{listing.title}</h5>
                                            <p className="card-text">&#8377; {listing.price} night</p>
                                        </div>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="container mt-5 text-center">
                                <h3>No listings found</h3>
                                <p>Try a different search term or category filter</p>
                            </div>
                        )}
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
};

export default ExplorePage;