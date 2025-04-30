// react
import { useState, useRef, useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom";

// services
import { login } from "../../services/authService";

// context
import { useAuth } from "../../context/AuthContext";

// toast
import { toast } from 'react-hot-toast';

// includes
import Navbar from "../../components/includes/Navbar";
import Footer from "../../components/includes/Footer";

const LoginPage = ()=>{

    const navigate = useNavigate();
    
    const { setUser } = useAuth();

    // Login page
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    
    const inputChangeHandler = (event)=>{
        setFormData((prevFormData)=>({...prevFormData, [event.target.name]: event.target.value}));
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
            toast.loading('Verifying...', { id: 'verifying' });
            const response = await login(formData);
            toast.dismiss('verifying');
            
            if (response.data.success) {
                setUser(response.data.user);
                form.classList.remove("was-validated");
                setFormData({
                    username: "",
                    password: "",
                });
                navigate('/explore');
            } 
        }
    }

    
    return (
        <>  
            <div id="body">
                <Navbar/>
                <main id="main">
                    <div id="container">
                        <form method="" action="" ref={formRef} className="needs-validation" noValidate onSubmit={submitHandler}>
                            <h3>User login</h3> 
                            <br/>
                            <div className="mb-3">
                                <label htmlFor="usernameInput" className="form-label">Username</label>
                                <input type="text" className="form-control" id="usernameInput" name="username" placeholder="Enter Username" required value={formData.username} onChange={inputChangeHandler}/>
                                {/* <!-- <div className="invalid-feedback">Please enter an username</div> --> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Enter Password" required value={formData.password} onChange={inputChangeHandler}/>
                                {/* <!-- <div className="invalid-feedback">Please enter a password</div> --> */}
                            </div>
                            <br/>
                            <button id="btn" className="btn">Log in</button>
                        </form>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    )
};

export default LoginPage;