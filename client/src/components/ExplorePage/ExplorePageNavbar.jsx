import './ExplorePageNavbar.css';

// react router
import { useNavigate, useLocation } from 'react-router-dom';

// Epn icons
import {FaBinoculars, FaCaravan, FaChessRook, FaCity, FaGolfBallTee, FaHouseChimneyCrack, FaLandmark, FaMountainCity, FaMugHot, FaPersonHiking, FaPersonSkiing, FaSailboat, FaSliders, FaSnowboarding, FaSnowflake, FaSpa, FaTent, FaTree, FaUmbrellaBeach, FaWaterLadder} from '../Icons/ExplorePageIcons';

function ExplorePageNavbar () {
    
    const navigate = useNavigate();
    const location = useLocation();
    
    // Function to handle category selection
    const handleCategoryClick = (category) => {
        navigate(`/explore?category=${encodeURIComponent(category)}`);
    };
    
    // Function to check if category is active
    const isActiveCategory = (category) => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('category') === category;
    };
    
    return (
        <>
        
            <nav className='navbar navbar-expand bg-body-light'>
                <div className="container-fluid epn-conatainer ">
                    
                    <div className="navbar-nav epn-nav">
                        <div className={`epnc nav-link ${isActiveCategory('Cabin') ? 'active' : ''}`} onClick={() => handleCategoryClick('Cabin')}>
                            <FaHouseChimneyCrack/>
                            <p className='epnc-name '>Cabin</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Pool') ? 'active' : ''}`} onClick={() => handleCategoryClick('Pool')}>
                            <FaWaterLadder/>
                            <p className='epnc-name '>Pool</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Forest') ? 'active' : ''}`} onClick={() => handleCategoryClick('Forest')}>
                            <FaTree/>
                            <p className='epnc-name '>Forest</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Hiking') ? 'active' : ''}`} onClick={() => handleCategoryClick('Hiking')}>
                            <FaPersonHiking/>
                            <p className='epnc-name '>Hiking</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Castle') ? 'active' : ''}`} onClick={() => handleCategoryClick('Castle')}>
                            <FaChessRook/>
                            <p className='epnc-name '>Castle</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Beach') ? 'active' : ''}`} onClick={() => handleCategoryClick('Beach')}>
                            <FaUmbrellaBeach/>
                            <p className='epnc-name '>Beach</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Top cities') ? 'active' : ''}`} onClick={() => handleCategoryClick('Top cities')}>
                            <FaCity/>
                            <p className='epnc-name '>Top cities</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Arctic') ? 'active' : ''}`} onClick={() => handleCategoryClick('Arctic')}>
                            <FaSnowflake/>
                            <p className='epnc-name '>Arctic</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Hill station') ? 'active' : ''}`} onClick={() => handleCategoryClick('Hill station')}>
                            <FaMountainCity/>
                            <p className='epnc-name '>Hill station</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Bed & breakfast') ? 'active' : ''}`} onClick={() => handleCategoryClick('Bed & breakfast')}>
                            <FaMugHot/>
                            <p className='epnc-name '>Bed & breakfast</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Camping') ? 'active' : ''}`} onClick={() => handleCategoryClick('Camping')}>
                            <FaTent/>
                            <p className='epnc-name '>Camping</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Golfing') ? 'active' : ''}`} onClick={() => handleCategoryClick('Golfing')}>
                            <FaGolfBallTee/>
                            <p className='epnc-name '>Golfing</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Spa') ? 'active' : ''}`} onClick={() => handleCategoryClick('Spa')}>
                            <FaSpa/>
                            <p className='epnc-name '>Spa</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Surfing') ? 'active' : ''}`} onClick={() => handleCategoryClick('Surfing')}>
                            <FaSnowboarding/>
                            <p className='epnc-name '>Surfing</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Boats') ? 'active' : ''}`} onClick={() => handleCategoryClick('Boats')}>
                            <FaSailboat/>
                            <p className='epnc-name '>Boats</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Safari') ? 'active' : ''}`} onClick={() => handleCategoryClick('Safari')}>
                            <FaBinoculars/>
                            <p className='epnc-name '>Safari</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Ski-in') ? 'active' : ''}`} onClick={() => handleCategoryClick('Ski-in')}>
                            <FaPersonSkiing/>
                            <p className='epnc-name '>Ski-in</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Camper vans') ? 'active' : ''}`} onClick={() => handleCategoryClick('Camper vans')}>
                            <FaCaravan/>
                            <p className='epnc-name '>Camper vans</p>
                        </div>
                        <div className={`epnc nav-link ${isActiveCategory('Monuments') ? 'active' : ''}`} onClick={() => handleCategoryClick('Monuments')}>
                            <FaLandmark/>
                            <p className='epnc-name '>Monuments</p>
                        </div>
                    </div>
                    <div className="epn-btns d-none d-md-flex">
                        <button className='epn-btn'>
                            <FaSliders/> &nbsp;
                            Filters

                        </button>
                        <button className='epn-btn d-flex'>
                            Display total before taxes &nbsp;
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" />
                            </div>
                            
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default ExplorePageNavbar;