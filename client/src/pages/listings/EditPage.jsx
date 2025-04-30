// react
import { useEffect, useState, useRef } from "react";

// react router
import { useNavigate, useLocation } from "react-router-dom";

// services
import { getListing, updateListing } from "../../services/listingsService";

// toast
import { toast } from 'react-hot-toast';

// includes
import Navbar from "../../components/includes/Navbar";
import Footer from "../../components/includes/Footer";

// Define allowed categories
const ALLOWED_CATEGORIES = [
    "Cabin", "Pool", "Forest", "Hiking", "Castle", "Beach", 
    "Top cities", "Arctic", "Hill station", "Bed & breakfast", 
    "Camping", "Golfing", "Spa", "Surfing", "Boats", "Safari", 
    "Ski-in", "Camper vans", "Monuments"
];

const EditPage = ()=>{

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    // Edit page
    const [listing, setListing] = useState({
        title: "",
        description: "",
        images: [],
        price: "",
        location: "",
        country: "",
        categories: []
    });
    
    const [imagesString, setImagesString] = useState("");

    const inputChangeHandler = (event)=>{
        setListing((prevListing)=>({...prevListing, [event.target.name]: event.target.value}));
    };

    const imagesChangeHandler = (event) => {
        setImagesString(event.target.value);
        // Convert comma-separated string to array
        const imagesArray = event.target.value.split(',').map(url => url.trim()).filter(url => url !== '');
        setListing(prevListing => ({...prevListing, images: imagesArray}));
    };

    const categoriesChangeHandler = (event) => {
        // Get selected options from multi-select
        const selectedCategories = Array.from(event.target.selectedOptions, option => option.value);
        setListing(prevListing => ({...prevListing, categories: selectedCategories}));
    };

    const formRef = useRef(null);
    const submitHandler = async(event)=>{

        event.preventDefault(); // Prevent default submission
        const form = formRef.current;
        if (form.checkValidity() === false) {
        event.stopPropagation();
        }
        form.classList.add("was-validated"); // Manually trigger Bootstrap validation
        
        if (form.checkValidity() === true) {
            // Validate max 3 images
            if (listing.images.length > 3) {
                toast.error('Maximum 3 images allowed');
                return;
            }

            toast.loading('Updating listing...', { id: 'loading' });
            const response = await updateListing(id, {listing});
            toast.dismiss('loading');
            
            navigate('/show', {state : {id:response.data.data._id}});
    
            setListing({
                title: "",
                description: "",
                images: [],
                price: "",
                location: "",
                country: "",
                categories: []
            });
            setImagesString("");
        }
        
    }

    useEffect(()=>{
        if (!id) {
            toast.error('Listing not found');
            navigate('/explore');
        }
        else {
            const useAsync = async ()=>{
                // console.log("useAsync show", id);
                
                const response = await getListing(id);
                // console.log("response:",response);
                let {
                    title="",
                    description="",
                    images=[],
                    price="",
                    location="",
                    country="",
                    categories=[]
                } = response.data.data;
                
                setListing({title, description, images, price, location, country, categories});
                // Convert images array to comma-separated string for display
                setImagesString(images.join(', '));
            }
            useAsync();
        }
    },[]);

    if(!id) return(null);

    return (
        <>  
            <div id="body">
                <Navbar/>
                <main id="main">
                    <div id="container">                    
                        <form id="form" method="" action="" ref={formRef} className="needs-validation" noValidate onSubmit={submitHandler}>
                            <h3>Update Listing</h3> 
                            <br/>
                            <div className="mb-3">
                                <label htmlFor="titleInput" className="form-label">Title</label>
                                <input type="text" className="form-control" id="titleInput" name="title" placeholder="Enter title" required value={listing.title} onChange={inputChangeHandler}/>
                                <div className="invalid-feedback">Please enter a title</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descriptionInput" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="descriptionInput" name="description" placeholder="Enter description" required value={listing.description} onChange={inputChangeHandler}></textarea>
                                <div className="invalid-feedback">Please enter a short desctription</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imagesInput" className="form-label">Images</label>
                                <textarea 
                                    className="form-control" 
                                    id="imagesInput" 
                                    name="images" 
                                    placeholder="Enter image URLs separated by commas" 
                                    value={imagesString} 
                                    onChange={imagesChangeHandler}
                                    rows="3"
                                ></textarea>
                                <small className="text-muted">up to 3</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoriesInput" className="form-label">Categories</label>
                                <select 
                                    className="form-select" 
                                    id="categoriesInput" 
                                    name="categories" 
                                    multiple 
                                    value={listing.categories} 
                                    onChange={categoriesChangeHandler}
                                >
                                    {ALLOWED_CATEGORIES.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                <small className="text-muted">Hold Ctrl/Cmd to select multiple categories</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="priceInput" className="form-label">Price</label>
                                <input type="text" className="form-control" id="priceInput" name="price" placeholder="Enter price" required value={listing.price} onChange={inputChangeHandler}/>
                                <div className="invalid-feedback">Enter a valid price</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="locationInput" className="form-label">Location</label>
                                <input type="text" className="form-control" id="locationInput" name="location" placeholder="Enter location" required value={listing.location} onChange={inputChangeHandler}/>
                                <div className="invalid-feedback">Enter a valid location</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="countryInput" className="form-label">Country</label>
                                <input type="text" className="form-control" id="countryInput" name="country" placeholder="Enter country" required value={listing.country} onChange={inputChangeHandler}/>
                                <div className="invalid-feedback">Enter a valid country</div>
                            </div>
                            <br/>
                            <button id="btn" className="btn">Update</button>
                        </form>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    )
};

export default EditPage;