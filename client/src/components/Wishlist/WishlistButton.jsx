import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from '../Icons/IncludesIcons';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'react-hot-toast';
import './WishlistButton.css';

const WishlistButton = ({ listingId }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isWishlisted, addListingToWishlist, removeListingFromWishlist } = useWishlist();
    const [wishlisted, setWishlisted] = useState(false);
    
    useEffect(() => {
        setWishlisted(isWishlisted(listingId));
    }, [listingId, isWishlisted]);
    
    const handleWishlistClick = async (e) => {
        e.preventDefault(); // Prevent any form submission
        e.stopPropagation(); // Prevent navigating to the listing details
        
        if (!user) {
            toast.error('Please log in to save to wishlist');
            navigate('/login');
            return;
        }

        // Immediately update UI for better user experience
        const wasWishlisted = wishlisted;
        setWishlisted(!wasWishlisted);

        try {
            let response;
            if (wasWishlisted) {
                // Remove from wishlist
                response = await removeListingFromWishlist(listingId);
                if (!(response && response.data.success)) {
                    setWishlisted(true);
                }
            } else {
                // Add to wishlist
                response = await addListingToWishlist(listingId);
                if (!(response && response.data.success)) {
                    setWishlisted(false);
                }
            }
        } catch (error) {
            // Revert UI on error
            setWishlisted(wasWishlisted);
            toast.error('Wishlist operation failed');
        }
    };
    
    return (
        <div className="wishlist-btn-container" onClick={handleWishlistClick}>
            <FaHeart className={wishlisted ? 'wishlist-btn-icon-wishlisted' : 'wishlist-btn-icon'} />
        </div>
    );
};

export default WishlistButton; 