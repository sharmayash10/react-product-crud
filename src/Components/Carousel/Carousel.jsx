import React, { useEffect } from "react";
import CarouselReact from "react-bootstrap/Carousel";
import CardReact from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Carousel.css";

const Carousel = (props) => {
  //Array to store name of all Images
  const imgList = [
    "Coffee 1.jpg",
    "Coffee 2.webp",
    "Coffee 3.jpg",
    "Coffee 3.webp",
    "Coffee 4.jpg",
    "Coffee 4.webp",
    "Coffee 5.webp",
    "Coffee 6.webp",
    "Coffee 7.webp",
    "Coffee 8.webp",
    "Coffee.jpg",
    "Coffee.png",
    "Coffee.webp",
  ];

  //This function groups images into pair of 4
  const groupImages = imgList.reduce((arr, cur, index) => {
    var cardCountperSlide = 4;
    var groupIndex = Math.floor(index / cardCountperSlide);
    if (arr[groupIndex] === undefined) {
      arr[groupIndex] = [];
    }
    arr[groupIndex].push(cur);

    return arr;
  }, []);

  return (
    <>
      <CarouselReact>
        {groupImages.map((groupedImg, idx) => {
          return (
            <CarouselReact.Item key={idx} className="caro-card-parent">
              <Row>
                {groupedImg.map((item, index) => {
                    return (
                    <Col lg="3" md="3" sm="3" xs="3" className="gx-lg-3 gx-md-2" key={index}>
                        <CardReact>
                            <CardReact.Img variant="top" src={`/img-car/${item}`} style={{ height: "150px" }}/>
                        </CardReact>
                    </Col>
                    )
                })}
              </Row>
            </CarouselReact.Item>
          );
        })}
      </CarouselReact>
    </>
  );
};

export default Carousel;