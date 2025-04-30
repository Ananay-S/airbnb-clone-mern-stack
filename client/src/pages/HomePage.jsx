import './HomePage.css';

// includes
import Navbar from "../components/includes/Navbar";
import Footer from "../components/includes/Footer";

// MernLogos
import { TIExpress, TIMongoDB, TINode, TIReact } from '../components/Icons/MernLogos';

const HomePage = ()=>{
    return (
        <>
            <div id="body">
                <Navbar/>   
                    <div id="main">
                        <div id="container">
                            <h1>🕵️About page</h1>
                            <h4>Press the Airbnb logo in the top-left to continue exploring the project.</h4>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    );
};

export default HomePage;