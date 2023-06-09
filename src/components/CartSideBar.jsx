import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, purchaseCartThunk, updateQThunk } from "../store/slices/cart.slice";
import Button from "react-bootstrap/Button";


const CartSideBar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const decrement = cart => {
    if (cart.quantity > 1) {
        dispatch(updateQThunk(cart.id, cart.quantity - 1))
    }
  }

  const increment = cart => {
    dispatch(updateQThunk(cart.id, cart.quantity + 1))
  }

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ul>
                {cart.map( item => (
                    <li key={item.product.id}>
                        <small>{item.product.title}</small>
                        <img src={item.product.images[0]?.url} alt="" className="img-fluid" />
                        <Button
                        disabled={item.quantity === 1}
                        onClick={() => decrement(item)}> - </Button>
                        {item.quantity}
                        <Button
                        onClick={() => increment(item)} > + </Button>
                    </li>
                ))}
            </ul>
            <Button
            onClick={() => dispatch(purchaseCartThunk())}>Buy Now</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartSideBar;
