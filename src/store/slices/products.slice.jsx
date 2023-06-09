import {createSlice} from '@reduxjs/toolkit'
import {setIsLoading} from './isLoading.slice';
import axios from 'axios'

export const productsSlice = createSlice ({
    name: 'products',
    initialState:[],
    reducers: {
        setProducts : (state, action) => {
            return action.payload
        }
    }
})

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const getProductsThunk = ( ) => dispatch => {
    dispatch(setIsLoading(true)),
    axios
    .get('https://e-commerce-api-v2.academlo.tech/api/v1/products/')
    .then(resp => {
        dispatch(setProducts(resp.data))
    })
    .catch(error => 'Estamos teniendo problemas, por favor intenta de nuevo')
    .finally (() => dispatch(setIsLoading(false)))
}

export const filterCategoryThunk = (id) => dispatch => {
    dispatch(setIsLoading(true)),
    axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
    .then(resp => dispatch(setProducts(resp.data)))
    .catch(error => 'Estamos teniendo problemas, por favor intenta de nuevo')
    .finally (() => dispatch(setIsLoading(false)))
}

export const searchThunk = (searchValue) => dispatch => {
    dispatch(setIsLoading(true)),
    axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${searchValue}`)
    .then(resp => dispatch(setProducts(resp.data)))
    .catch(error => 'Estamos teniendo problemas, por favor intenta de nuevo')
    .finally (() => dispatch(setIsLoading(false)))
}