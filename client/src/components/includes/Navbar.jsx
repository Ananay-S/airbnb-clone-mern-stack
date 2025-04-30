import "./Navbar.css";

// react
import { useState } from "react";

// React router
import { useNavigate } from "react-router-dom";

// Services
import { logout } from "../../services/authService";

// Context
import { useAuth } from "../../context/AuthContext"; 

// Includes icons
import { FaAirbnb, FaMagnifyingGlass, FaBars, FaCircleUser, FaHeart } from "../Icons/IncludesIcons";

// Toast
import { toast } from 'react-hot-toast';

function Navbar () {
    
    const { user, setUser } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    
    const navigate = useNavigate();


    const handleExplore = ()=>{
        navigate('/explore');
    }
    const handleSearch = (e)=>{
        e.preventDefault();
        
        if (searchQuery.trim()) {
            navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    }
    
    const handleWishlist = () => {
        navigate('/explore?wishlist=true');
    }
    
    const handleAdd = ()=>{
        navigate('/add');
    }

    const handleSignup = ()=>{
        navigate('/signup');
    };
    const handleLogin = ()=>{
        navigate('/login');
    };
    const handleLogout = async () => {
        try {
            // Check if we're on the wishlist page before logging out
            const searchParams = new URLSearchParams(window.location.search);
            const isOnWishlist = searchParams.get('wishlist') === 'true';
            
            await logout();
            setUser(null);
            
            // If we're on the wishlist page, redirect to explore
            if (isOnWishlist) {
                navigate('/explore');
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed");
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
                <div id="navbar-container-fluid" className="container-fluid">
                    
                    {/* Brand */}
                    <a className="navbar-brand d-flex justify-content-center align-items-center" onClick={handleExplore}>
                        <FaAirbnb/>
                        airbnb
                    </a>

                    {/* Toggler */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>  
                    
                    {/* Collapse */}
                    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <form className="d-flex" role="search" onSubmit={handleSearch}>
                                <input 
                                    id="search-box" 
                                    className="form-control me-2" 
                                    type="search" 
                                    placeholder="Start your search" 
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button id="search-btn" className="form-submit btn d-flex justify-content-center align-items-center" type="submit" >
                                    <FaMagnifyingGlass/>
                                </button>
                            </form>
                        </div>
                        <div className="navbar-nav ms-auto">
                            <a className="nav-link" onClick={handleAdd}>&nbsp; Airbnb your home &nbsp;</a>
                            <div className="dropdown">
                                <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaBars/>
                                    <FaCircleUser/>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    { user ? (
                                        <>
                                            <li><h6>&nbsp;&nbsp; @ {user.username} </h6></li>
                                            <li>
                                                <a className="dropdown-item" onClick={handleWishlist}>
                                                <FaHeart className='wishlist-btn-icon-wishlisted' /> Wishlist
                                                </a>
                                            </li>
                                            <li><a className="dropdown-item" onClick={handleLogout}>Log out</a></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><a className="dropdown-item" onClick={handleSignup}>Sign up</a></li>
                                            <li><a className="dropdown-item" onClick={handleLogin}>Log in</a></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Navbar;