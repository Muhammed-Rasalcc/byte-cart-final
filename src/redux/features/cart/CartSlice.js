import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    selectItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0,


  } 

  const CartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers:{
        AddToCart: (state, action) => {
            const isExist = state.products.find((product) => product._id === action.payload._id)
            
            if (!isExist) {
                state.products.push({...action.payload, quantity: 1})
            }else{
                console.log("items already added")
            }
            state.selectItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal =setGrandtotal(state);
        },
        updateQuantity: (state, action) =>{
            const products = state.products.map((product) =>{
                if(product._id === action.payload.id){
                    if(action.payload.type === 'increment'){
                        product.quantity +=1;
                    }else if(action.payload.type === 'decrement'){
                        if(product.quantity >1){
                            product.quantity -=1
                        }
                    }
                }
                return product;
            });
            state.selectItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal =setGrandtotal(state);
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload.id);
            state.selectItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal =setGrandtotal(state);
        },
        clearcart: (state) =>{
            state.products =[];
            state.selectItems =0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal =0;
        }
    },
  });


 export const setSelectedItems= (state) => state.products.reduce((total, product) => {
    return Number( total + product.quantity)
 }, 0)

 export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number( total + product.quantity * product.price)
 }, 0)

 export const setTax = (state) => setTotalPrice(state) * state.taxRate;

 export const setGrandtotal =(state) => {
    return setTotalPrice(state) + setTotalPrice(state) * state.taxRate
 }

 export const{AddToCart, updateQuantity, removeFromCart, clearcart} =CartSlice.actions;
 export default CartSlice.reducer;