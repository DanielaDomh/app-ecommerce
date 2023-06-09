import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import axios from "axios";
import getConfiguration from "../Utils/getConfiguration";

const Purchases = () => {
    const [ product, setProduct ] = useState([])
    useEffect(() => {
        axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfiguration())
        .then(resp=> setProduct(resp.data))
        .catch(error=>console.log(error))
    }, []);
    return (
        <div>
            <h1>Purchases</h1>
            <ListGroup>
            {product.map(item=>(
                <ListGroup.Item
                key={item.id}>
                <img className= 'purchase-img' src={item.product.images?.[0].url} alt=""/>
                    <p>{item.product.title}</p>,
                    <p>{item.product.price}</p>
                    <div>{item.quantity}</div>
                    </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
};

export default Purchases;