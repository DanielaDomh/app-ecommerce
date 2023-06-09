import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfiguration from "../../Utils/getConfiguration";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true)),
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfiguration())
      .then((resp) => {
        dispatch(setCart(resp.data))
      })
      .catch(
        (error) => console.log(error)
      )
      .finally(() => dispatch(setIsLoading(false)));
};


export const addCartThunk = data => dispatch => {
    dispatch(setIsLoading(true));
    axios 
    .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data,
    getConfiguration())
    .then(() => dispatch(getCartThunk()))
    .catch(error=> console.log("Something went wrong"))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const updateQThunk = (id, quantity) => dispatch => {
    dispatch(setIsLoading(true))

    const body = {
        quantity : quantity 
    };

    axios 
    .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfiguration() )
    .then(() => dispatch(getCartThunk()))
    .catch(error => console.log("Something went wrong."))
    .finally(()=>dispatch(setIsLoading(false)))

};

export const purchaseCartThunk = () => dispatch => {
     dispatch(setIsLoading(true))
     axios
     .post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, {}, getConfiguration())
     .then(() => dispatch(getCartThunk()))
     .catch(error => console.log("Something went wrong."))
     .finally(()=>dispatch(setIsLoading(false)))
    
}