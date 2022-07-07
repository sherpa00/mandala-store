import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addCart: (state,action) => {
            state.cart = [...state.cart,action.payload]
        },
        removeCart: (state,action) => {
            let tempState = state.cart;
            tempState.splice(action.payload,1);
            state.cart = tempState;
        },
        removeAll: (state,action) => {
            state.cart = []
        }
    }
});

export const {addCart,removeCart,removeAll} = cartSlice.actions;
export default cartSlice.reducer;

