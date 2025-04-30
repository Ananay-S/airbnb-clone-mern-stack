import "./Footer.css";

// Includes icons
import { FaGlobe, FaIndianRupeeSign, FaSquareFacebook, FaSquareTwitter, FaSquareInstagram } from "../Icons/IncludesIcons";

function Footer () {
    return (
        <>
            <footer>
                <div className="bldn">
                    <div className="f-info d-flex justify-content-between align-items-center mqg-900">
                        <div className="d-flex">
                            <div className="f-info-c p-2">
                                &copy;
                                2025 Airbnb,Inc.
                            </div>
                            <div className="f-info-links p-2">
                                <a href="">Privacy</a>
                                <a href="">Terms</a>
                                <a href="">Sitemap</a>
                                <a href="">Company Details</a>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="f-info-access p-2">
                                <a href="">
                                    <FaGlobe/>
                                    English(IN)
                                </a>
                                <a href="">
                                    <FaIndianRupeeSign/>
                                    INR
                                </a>
                            </div>
                            <div className="f-info-socials p-2">
                                <FaSquareFacebook/>
                                <FaSquareTwitter/>
                                <FaSquareInstagram/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="aldn">
                    <div className="f-info d-flex flex-column justify-content-between align-items-center">
                            <div className="f-info-brand  d-flex ">
                                &copy;
                                2025 Airbnb,Inc.
                            </div>
                            <div className="f-info-links d-flex ">
                                <a href="">Privacy</a>
                                <a href="">Terms</a>
                                <a href="">Sitemap</a>
                                <a href="">Company Details</a>
                            </div>
                            <div className="f-info-access d-flex justify-content-center align-items-center">
                                <a href="">
                                    <FaGlobe/>
                                    English(IN)
                                </a>
                                <a href="">
                                    <FaIndianRupeeSign/>
                                    INR
                                </a>
                            </div>
                            <div className="f-info-socials d-flex justify-content-center align-items-center">
                                <FaSquareFacebook/>
                                <FaSquareTwitter/>
                                <FaSquareInstagram/>
                            </div>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;