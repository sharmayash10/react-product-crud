import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  //State for form values and errors as well
  const [userInfo, setUserInfo] = useState({id:null, email: "", username: "", password: "", confPassword: "" });
  const [errors, setErrors] = useState({ email: "", username: "", password: "", confPassword: "" });

  //Redirect to Add Note Route after signing up
  const navigate = useNavigate();
  const redirectAfterSignup = () => {
    navigate('/product');
  };
    
  //Handle form input value change
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    
    // Conditional error removal based on length condition
    if (e.target.name === "email" && e.target.value.length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
    if (e.target.name === "username" && e.target.value.length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
    if (e.target.name === "password" && e.target.value.length >=5) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    if (e.target.name === "confPassword" && e.target.value.length > 0) {
      // Check if the confirm password matches the password
      if (e.target.value !== userInfo.password) {
        setErrors((prevErrors) => ({ ...prevErrors, confPassword: "Passwords do not match" }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, confPassword: "" }));
      }
    }
  }

  //Handle form submit
  const signupUser = (e) =>{
    e.preventDefault();

    // Validate inputs and set errors
    let formErrors = { email: "", username: "", password: "", confPassword: "" };

    const trimmedEmail = userInfo.email.trim();
    if (trimmedEmail.length === 0) {
      formErrors.email = "Email cannot be blank";
    }

    const trimmedUsername = userInfo.username.trim();
    if (trimmedUsername.length === 0) {
      formErrors.username = "Username cannot be blank";
    }

    const trimmedPassword = userInfo.password.trim();
    if (trimmedPassword.length === 0) {
      formErrors.password = "Password cannot be blank";
    }else if(trimmedPassword.length < 5){
      formErrors.password = "Password must be atleast 5 character long";
    }

    const trimmedConfPassword = userInfo.confPassword.trim();
    if (trimmedPassword.length > 0 && trimmedConfPassword.length === 0) {
      formErrors.confPassword = "Please confirm your password";
    } else if (trimmedConfPassword !== trimmedPassword) {
      formErrors.confPassword = "Passwords do not match";
    }

    // If there are errors, set them in state and prevent form submission
    if (formErrors.email || formErrors.username || formErrors.password || formErrors.confPassword) {
      setErrors(formErrors);
      return;
    }
    
    //Store credentials in localStorage
    var {confPassword: _ , ...accDetail} = userInfo;

    //Storing old credentials too, if existed
    if(localStorage.getItem("acc-detail")){
      var otherCredentials = JSON.parse(localStorage.getItem("acc-detail"));
      accDetail['id'] = otherCredentials.length + 1;
      otherCredentials.push(accDetail);
      localStorage.setItem("acc-detail", JSON.stringify(otherCredentials));

      //Set logged in ID
      var loggedinDetail = {
        "id": otherCredentials.length,
        "loggedIn": true
      }
      localStorage.setItem("loggedIn", JSON.stringify(loggedinDetail));
    }
    else{
      accDetail['id'] = 1;
      var arr = [];
      arr.push(accDetail);
      localStorage.setItem("acc-detail", JSON.stringify(arr));

      //Set logged in ID
      var loggedinDetail = {
        "id": 1,
        "loggedIn": true
      }
      localStorage.setItem("loggedIn", JSON.stringify(loggedinDetail));
    }

    //Redirect to Home page after signup
    redirectAfterSignup();
  }
  
  return (
    <Form onSubmit={signupUser}>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' value={userInfo.email} onChange={handleChange}/>
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name='username' value={userInfo.username} onChange={handleChange}/>
        {errors.username && <small className="text-danger">{errors.username}</small>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' value={userInfo.password} onChange={handleChange} autoComplete="on"/>
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="confPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" name='confPassword' value={userInfo.confPassword} onChange={handleChange} autoComplete="on"/>
        {errors.confPassword && <small className="text-danger">{errors.confPassword}</small>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
