import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk, filterCategoryThunk,searchThunk } from "../store/slices/products.slice";
import { useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const [ categories, setCategories ] = useState([]);
  const [ searchValue, setSearchValue ] = useState ("")

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Row>
        <Col md={4} lg={3}>
          <h1>Filtrados</h1>
          <p>Category</p>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => dispatch(filterCategoryThunk(category.id))}>
                {category.name}
          </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8} lg={9}>
          <h1>Products</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search by Title"
              aria-label="Search by Title"
              aria-describedby="basic-addon2"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Button
            onClick={() => dispatch(searchThunk(searchValue))}
            variant="outline-secondary" id="button-addon2"> Search </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3}>
            {productList.map((products) => (
              <Col key={products.id} className="mb-4">
                <Link to={`/product/${products.id}`}>
                <Card
                  className="card"
                  style={{ width: "16rem", height: "24rem"}}>
                  <Card.Img className="images" variant="top" src={products.images[0].url}/>
                  <Card.Body>
                    <Card.Text className="mb-0"> {products.brand} </Card.Text>
                    <p className="title">{products.title}</p>
                    <Card.Text> ${products.price} </Card.Text>
                    <Button><box-icon name='cart-download' color='#efebeb'/></Button>
                  </Card.Body>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Home;
