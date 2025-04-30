import '../../components/css/Carousal.css';

// react
import { useEffect, useState, useRef } from "react";

// react router
import { useNavigate, useLocation } from "react-router-dom";

// services
import { deleteListing, getListing } from "../../services/listingsService";
import { getReviews, createReview, deleteReview } from "../../services/reviewsService";

// context
import { useAuth } from "../../context/AuthContext";

// toast
import toast from "react-hot-toast";

// includes
import Navbar from "../../components/includes/Navbar";
import Footer from "../../components/includes/Footer";

// components
import WishlistButton from "../../components/Wishlist/WishlistButton";

// fontawesome icons
import { FaStar } from "../../components/Icons/PagesIcons";



const ShowPage = ()=>{
    
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const { user, setUser } = useAuth();
    
    // Show page

    const [listing, setListing] = useState({});
    const [owner, setOwner] = useState({});
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({
        rating: "3",
        comment: "",
    });
        
    const inputChangeHandler = (event)=>{
        setReview((prevReview)=>({...prevReview, [event.target.name]: event.target.value}));
    };
    
    const formRef = useRef(null);
    const submitHandler = async (event)=>{

        event.preventDefault(); // Prevent default submission
        const form = formRef.current;
        if (form.checkValidity() === false) {
        event.stopPropagation();
        }
        form.classList.add("was-validated"); // Manually trigger Bootstrap validation
            
        if (form.checkValidity() === true) {
            
            toast.loading('Creating review...', { id: 'loading' });
            await createReview(id, {review});
            toast.dismiss('loading');

            const response = await getReviews(id);
            setReviews(response.data.reviews);

            form.classList.remove("was-validated");
            setReview({
                rating: "3",
                comment: "",
            });
        }

    }

    const handleDeleteReview = async(reviewId)=>{
        toast.loading('Deleting review...', { id: 'loading'});
        await deleteReview(id, reviewId);
        toast.dismiss('loading');
        const response = await getReviews(id);
        setReviews(response.data.reviews);
    };

    const handleEditListing = async(id)=>{
        navigate('/edit', {state : {id}});
    };

    const handleDeleteListing = async(id)=>{
        toast.loading('Deleting listing...', { id: 'loading'});
        await deleteListing(id);
        toast.dismiss('loading');
        navigate('/explore');
    };



    useEffect(()=>{
        window.scrollTo(0, 0);
        if (!id) {
            toast.error('Listing not found');
            navigate('/explore');
        } else {
            const useAsync = async ()=>{
                toast.loading('Loading...', { id: 'loading' });
                const response = await getListing(id);
                toast.dismiss('loading');

                setListing(response.data.data);
                setOwner(response.data.data.owner);
                setReviews(response.data.data.reviews);
            }
            useAsync();
        }
    },[]);

    if (!id) return null;

    return (
        <>  
            <div id="body">
                <Navbar/>
                <main id="main">
                    <div id="container"> 
                        <section id="listing">
                            <br/>
                            <div id="listing-card"> 
                                <div id="sp-card" className="card">
                                    <h5 className="card-title">{listing.title}</h5>
                                    
                                    <div id="carouselShowPage" className="carousel slide carousel-fade show-carousel" data-bs-ride="carousel">
                                        {/* Wishlist Button */}
                                        {id && <WishlistButton listingId={id} />}
                                        
                                        {/* Carousel indicators */}
                                        {listing.images && listing.images.length > 1 && (
                                            <div className="carousel-indicators">
                                                {listing.images.map((_, index) => (
                                                    <button 
                                                        key={index}
                                                        type="button" 
                                                        data-bs-target="#carouselShowPage" 
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
                                                    <img src={image} className="d-block w-100 card-img-top" id="sp-card-img" alt={`Listing ${index + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Carousel controls - only if multiple images */}
                                        {listing.images && listing.images.length > 1 && (
                                            <>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselShowPage" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#carouselShowPage" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-body-secondary">@ {owner.username}</h6>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">{listing.description}</h6>
                                        <p className="card-text">
                                            &#8377; {listing.price} night <br/>
                                            {listing.location} <br/>
                                            {listing.country} <br/>
                                        </p>
                                        { (user && user._id === (owner._id)) ? (
                                            <>
                                                <div className="d-flex justify-content-center">
                                                    <button id="btn" className="btn" onClick={()=>handleEditListing(id)}>Edit</button>
                                                    <button id="btn" className="btn" onClick={()=>handleDeleteListing(id)}>Remove</button>
                                                </div>
                                            </>
                                        ) : (<></>)}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <br />
                        </section>
                        
                        {(user) ? (

                        <section>
                            <h3>Leave a Review</h3> 
                            <br />
                            <form id="form" method="" action="" ref={formRef} className="needs-validation" noValidate onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="ratingInput" className="form-label">Rating</label>
                                    <input type="range" min="1" max="5" className="form-range" id="ratingInput" name="rating" placeholder="Enter rating" required value={review.rating} onChange={inputChangeHandler}/>
                                    <div className="invalid-feedback">Please enter a rating</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="commentInput" className="form-label">Comment</label>
                                    <textarea type="text" className="form-control" id="commentInput" name="comment" placeholder="Enter comment" required value={review.comment} onChange={inputChangeHandler}></textarea>
                                    <div className="invalid-feedback">Please enter a comment</div>
                                </div>
                                <br/>
                                <button id="btn" className="btn">Submit</button>
                            </form>
                            <hr />
                            <br />
                        </section>
                        ) : (<></>)}        

                        <section>
                            <h3>All Reviews</h3>
                            <br />
                            <div className="d-flex justify-content-center">
                                <div className="row row-cols-1">
                                    {reviews.map((review)=>(
                                        <div id="r-card" className="card col" key={review._id}>
                                            <div className="card-body">
                                                <h6 className="card-title">@ {review.author.username} </h6>
                                                <p className="card-text"> 
                                                    {review.comment} <br />
                                                    {review.rating} <FaStar/>
                                                </p>
                                            </div>
                                            {(user && user._id===review.author._id) ? (
                                                <button id="btn" className="btn" onClick={()=>{handleDeleteReview(review._id)}}>Delete</button>
                                            ) : (<></>)}
                                        </div>
                                    ))}
                                        
                                </div>
                            </div>
                        </section>
                        
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    )
};

export default ShowPage;