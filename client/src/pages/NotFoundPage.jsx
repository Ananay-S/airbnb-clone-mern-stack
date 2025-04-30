// includes
import Navbar from "../components/includes/Navbar";
import Footer from "../components/includes/Footer";

const NotFoundPage = ()=>{
    return (
        <>
            <div id="body">
                <Navbar/>   
                    <div id="main">
                        <div id="container">
                            <h4>404, Page not found</h4>
                        </div>
                    </div>
                <Footer/>
            </div>
        </>
    );
};

export default NotFoundPage;