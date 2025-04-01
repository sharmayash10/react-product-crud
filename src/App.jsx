import Navbar from "./Components/Navbar/Navbar";
import Carousel from "./Components/Carousel/Carousel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Signup from "./Components/Entry/Signup";
import List from "./Components/Product/List";
import Login from "./Components/Entry/Login";
import { useEffect, useState } from "react";

function App() {

  //State to manage login/logout buttons
  const [isLogin, setIsLogin] = useState(null);
  const [username, setUsername] = useState(null);
  const updateLogin = (value) => {
    (value === true) ? setIsLogin(true) : setIsLogin(false)
  }

  //check user is logged IN or not
  useEffect(()=>{
    setIsLogin(false);
    if(localStorage.getItem("loggedIn")){
      let isLoggedin = JSON.parse(localStorage.getItem("loggedIn"));
      if(isLoggedin.loggedIn){
        setIsLogin(true);
        
        var userData = JSON.parse(localStorage.getItem("acc-detail"));
        var curUser = userData.filter((val)=>{
          return val.id === isLoggedin.id
        });
        setUsername(curUser[0].username);
      }
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Container>
          <Navbar username={username} login={isLogin} updateLogin={updateLogin}/>
          <Routes>
            <Route path="/" element={<Carousel updateLogin={updateLogin}/>}></Route>
            <Route path="/signup" element={<Signup updateLogin={updateLogin}/>}></Route>
            <Route path="/login" element={<Login updateLogin={updateLogin}/>}></Route>
            <Route path="/product" element={<List login={isLogin}/>}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
