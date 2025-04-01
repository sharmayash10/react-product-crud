import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import "./List.css"

const List = (props) => {

  //State to fetch products
  const [products, setProducts] = useState(false);

  //State to store initial Product list - avoiding changing original list when searching
  const [initialProducts, setInitialProducts] = useState([]);

  //State to store selected product for update or view
  const [prodData, setProdData] = useState(undefined);

  //State to manage data for view or update modal accordingly
  const [modalname, setModalName] = useState(undefined);

  //State & Function for Modal
  const [modal, setModal] = useState(false);
  const hideModal = () => setModal(false);
  const showModal = (item, action) => {setProdData(item); setModalName(action); setModal(true);}

  //State for product sorting
  const [sortOrder, setSortOrder] = useState("asc");

  //State for showing filters
  const [filters, setFilters] = useState(false);
  //State for filtering data using categories
  const [category, setCategory] = useState([]);

  //Update product data form input values
  const handleChange = (e) =>{
    setProdData({...prodData, [e.target.name]: e.target.value})
  }

  //update product data - update form submit
  const updateProduct = async() =>{
    hideModal(); //Closing the Modal
    const updateResponse = await fetch(`https://fakestoreapi.com/products/${prodData.id}`, {
      method: 'PUT',
      headers: new Headers({
          "Content-Type": "application/json"
      }),
      body: JSON.stringify(prodData),
    });
    
    var jsonResponse = await updateResponse.json();
    if(jsonResponse){
      alert("Product Data Updated");
    }
    setProducts((prod)=>[...prod, jsonResponse]);
  }

  //function to Delete Product
  const deleteItem = async(id) => {
    let text = "Are you sure you want to delete?";
    if (confirm(text) == true) {
      const deleteResponse = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            "Content-Type": "application/json"
        })
      });
      
      var jsonResponse = await deleteResponse.json();
      if(jsonResponse){
        alert("Product Deleted Successfully");
      }
    }
  }

  //Function to search product
  const searchProd = (e) => {
    if(e.target.value.length > 0){
      let resultSearch = initialProducts.filter((item)=>{
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
      })
      setProducts(resultSearch);
    }else{
      setProducts(initialProducts)
    }
  }

  // Function to change sort order
  const changeSortOrder = () =>{
    setProducts(false);
    setSortOrder((prevOrder)=>prevOrder === "asc" ? "desc" : "asc");
  }

  //Function to show products as per category
  const selectCategory = async (e) => {
    let catSelected = e.target.value;
    let url;
    if(catSelected === "none"){
      url = `https://fakestoreapi.com/products?sort=${sortOrder}`
    }else{
      url = `https://fakestoreapi.com/products/category/${catSelected}`
    }
    setProducts(false);
    const fetchResponse = await fetch(url, {
      method: 'GET',
      headers: new Headers({
          "Content-Type": "application/json"
      })
    });
    let jsonResponse = await fetchResponse.json();
    setProducts(jsonResponse);
    setInitialProducts(jsonResponse); //Storing a copy of product list
  }

  //using useEffect hook to fetch products using API
  useEffect(()=>{
    const fetchProduct = async() =>{
        const fetchResponse = await fetch(`https://fakestoreapi.com/products?sort=${sortOrder}`, {
          method: 'GET',
          headers: new Headers({
              "Content-Type": "application/json"
          })
        });
      let jsonResponse = await fetchResponse.json();
      setProducts(jsonResponse);
      setInitialProducts(jsonResponse); //Storing a copy of product list
    }
    fetchProduct();
  }, [sortOrder])

  //using useEffect to set Categories
  useEffect(()=>{
    const fetchCategories = async() =>{
      const fetchResponse = await fetch('https://fakestoreapi.com/products/categories', {
        method: 'GET',
        headers: new Headers({
            "Content-Type": "application/json"
        })
      });
      let jsonResponse = await fetchResponse.json();
      setCategory(jsonResponse);
    }
    fetchCategories();
  }, [])

  return (
    <>
      {props.login ? 
      <div>
        <Form.Group as={Row} className="mb-2" controlId="formPlaintextPassword">
          <Form.Label column xs="3" sm="2">Search</Form.Label>
          <Col xs="8" sm="5">
            <Form.Control type="text" name='prod-search' onChange={searchProd} placeholder="Enter product title"/>
          </Col>
          {products && <Col xs="1" sm="1">
            <img src="logo/sort.png" className="prod-sort" alt="Sort Product order" onClick={changeSortOrder}/>
            <img src="logo/filter.png" className="prod-filter" alt="Product Filter" onClick={()=>{setFilters(!filters)}}/>
          </Col>}
        </Form.Group>
        {filters && <Row className="mb-3">
          <Col xs="1">Category</Col>
          <Col xs="3">
            <Form.Select defaultValue="none" onChange={selectCategory}>
              <option value="none">Choose...</option>
              {category.map((val, index)=>{
                return <option value={val} key={index}>{val}</option>
              })}
            </Form.Select>
          </Col>
        </Row>}
        
        {!products ? <img src="logo/spinner.gif" className="prod-list-spinner" alt="Loader" /> : 
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="col-2">Title</th>
                <th className="col-1">Price</th>
                <th className="col-6">Description</th>
                <th className="col-2">Category</th>
                <th className="col-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {products && products.map((item)=>{
                  return(
                    <tr key={item.id}>
                      <td>{item.title.length <= 30 ? item.title : `${item.title.slice(0,31)}...`}</td>
                      <td>{item.price}</td>
                      <td>{item.description.length <= 100 ? item.description : `${item.description.slice(0,101)}...`}</td>
                      <td>{item.category}</td>
                      <td>
                        <NavDropdown
                          id="product-list-action"
                          title="Select"
                          menuVariant="dark"
                        >
                          <NavDropdown.Item onClick={()=>{showModal(item, "view")}}>View</NavDropdown.Item>
                          <NavDropdown.Item onClick={()=>{showModal(item, "update")}}>Update</NavDropdown.Item>
                          <NavDropdown.Item onClick={()=>{deleteItem(item.id)}}>Delete</NavDropdown.Item>
                        </NavDropdown>
                      </td>
                    </tr>
                  )
              })}
            </tbody>
          </Table>
        }

        {/* View Modal */}
        <Modal show={modal} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalname === 'view' ? "Product Data" : "Update Data"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* Data as per view Modal */}
            {prodData && modalname === 'view' &&
              <div>
                <div>Title : {prodData.title}</div>
                <div>Price: {prodData.price}$</div>
                <div>Description: {prodData.description}</div>
                <div>Category: {prodData.category}</div>
                <div>Image: <img className="prod-img" src={`${prodData.image}`}/></div>
                <div>Rating: {prodData.rating.rate}</div>
                <div>Rating by: {prodData.rating.count} users</div>
              </div>
            }

            {/* Data as per update Modal */}
            {prodData && modalname === 'update' &&
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" value={prodData.title} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" value={prodData.price} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" rows={3} value={prodData.description} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" name="image" value={prodData.image} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" name="category" value={prodData.category} onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={updateProduct}>
                  Update
                </Button>
            </Form>
            }

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        : <div>Please Login/Signup to explore products</div>}
    </>
  );
};

export default List;
