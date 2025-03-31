import Navbar from "./Components/Navbar/Navbar";
import Carousel from "./Components/Carousel/Carousel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Signup from "./Components/Entry/Signup";
import List from "./Components/Product/List";
import Login from "./Components/Entry/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<Carousel />}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/product" element={<List/>}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
