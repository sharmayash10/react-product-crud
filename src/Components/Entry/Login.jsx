import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    //State for form values and errors as well
    const [loginInfo, setLoginInfo] = useState({username: "", password: ""});
    const [errors, setErrors] = useState({username: "", password: "" });

    //Redirect to Product Note Route after loggin
    const navigate = useNavigate();
    const redirectAfterLogin = () => {
        navigate('/product');
    };

    //Handle form submit
    const loginUser = (e) =>{
        e.preventDefault();

        // Validate inputs and set errors
        let formErrors = { username: "", password: "" };

        const trimmedUsername = loginInfo.username.trim();
        if (trimmedUsername.length === 0) {
        formErrors.username = "Username cannot be blank";
        }

        const trimmedPassword = loginInfo.password.trim();
        if (trimmedPassword.length === 0) {
        formErrors.password = "Password cannot be blank";
        }

        // If there are errors, set them in state and prevent form submission
        if (formErrors.username || formErrors.password) {
            setErrors(formErrors);
            return;
        }

        //Check user data
        var credentials = JSON.parse(localStorage.getItem("acc-detail"));
        let loginCheck = credentials.filter((val)=>{
            return val.username === loginInfo.username && val.password === loginInfo.password
        })

        if(loginCheck.length > 0){
            //Set logged in ID
            var loggedinDetail = {
                "id": loginCheck[0].id,
                "loggedIn": true
            }
            localStorage.setItem("loggedIn", JSON.stringify(loggedinDetail));

            redirectAfterLogin();
        }
    }

    //Handle form input value change
    const handleChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
        
        // Conditional error removal based on length condition
        if (e.target.name === "username" && e.target.value.length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
        }
        if (e.target.name === "password" && e.target.value.length >=5) {
            setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
        }
    }


  return (
    <Form onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name='username' value={loginInfo.username} onChange={handleChange}/>
        {errors.username && <small className="text-danger">{errors.username}</small>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' value={loginInfo.password} onChange={handleChange} autoComplete="on"/>
        {errors.password && <small className="text-danger">{errors.password}</small>}
        </Form.Group>

        <Button variant="primary" type="submit">
        Login
        </Button>
    </Form>
  )
}

export default Login
