import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filterCategoryThunk } from "../store/slices/products.slice";
import { addCartThunk } from "../store/slices/cart.slice";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [add, setAdd] = useState(1);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const productFiltered = allProducts.filter(
    (products) => products.id !== Number(id)
  );

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((resp) => {
        setProductDetail(resp.data);
        dispatch(filterCategoryThunk(resp.data.category.id));
      });
  }, []);

  const decrement = () => {
    if (add > 1) {
      setAdd(add - 1);
    }
  };

  const addToCart = () => {
    const productAdded = {
      quantity: add,
      productId: productDetail.id
    };
    dispatch(addCartThunk(productAdded));
  };

  return (
    <div>
      <Col>
        <Carousel className="carousel">
          <Carousel.Item>
            <img
              className="image"
              src={productDetail?.images?.[0].url}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="image"
              src={productDetail.images?.[1].url}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="image"
              src={productDetail.images?.[2].url}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Col>
      <Col>
        <h1>{productDetail.title}</h1>
        <p>$ {productDetail.price}</p>
        <p>{productDetail.description}</p>
      </Col>
      <Button className="button-add" variant="dark" onClick={() => decrement()}> - </Button>
      <span>{add}</span>
      <Button
        className="button-delete"
        variant="dark"
        onClick={() => setAdd(add + 1)}> + </Button>
      <Button className="button-add-cart" variant="dark" onClick={addToCart}> Add to cart </Button>
      <Row>
        <Col lg={4}>
          <h3>Recomended</h3>
          <ul>
            {productFiltered.map((product) => (
              <li key={product.id}>
                <Card
                  className="card"
                  style={{ width: "16rem", height: "24rem" }}>
                  <Card.Img
                    className="images"
                    variant="top"
                    src={product.images[0].url}
                  />
                  <Card.Body>
                    <Card.Text className="mb-0"> {product.brand} </Card.Text>
                    <p className="title">{product.title}</p>
                    <Card.Text> ${product.price} </Card.Text>
                    <Button>
                      <box-icon name="cart-download" color="#efebeb"></box-icon>
                    </Button>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
