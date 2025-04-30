// React Context for managing wishlist state

// client/src/context/WishlistContext.jsx

// React
import { createContext, useContext, useState, useEffect } from 'react';

// Services
import { addToWishlist, removeFromWishlist, getWishlist } from '../services/authService';

// Context
import { useAuth } from './AuthContext';

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist when user changes
  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    const response = await getWishlist();
    setWishlistItems(response.data.data || []);
  };

  const isWishlisted = (listingId) => {
    if (!user || !wishlistItems.length) return false;
    return wishlistItems.some(item => item._id === listingId || (typeof item === 'string' && item === listingId));
  };

  const addListingToWishlist = async (listingId) => {
    if (!user) return null;
    
    const response = await addToWishlist(listingId);
    if (response && response.data.success) {
      await fetchWishlist();
    }
    return response;
  };

  const removeListingFromWishlist = async (listingId) => {
    if (!user) return null;
    
    const response = await removeFromWishlist(listingId);
    if (response && response.data.success) {
      await fetchWishlist();
    }
    return response;
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      isWishlisted, 
      addListingToWishlist, 
      removeListingFromWishlist,
      fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}; 