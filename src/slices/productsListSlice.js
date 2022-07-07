import { createSlice } from "@reduxjs/toolkit";

export const productListSlice = createSlice({
    name: "productsList",
    initialState: {
        productsList: []
    },
    reducers: {
        addProductList: (state,action) => {
            state.productsList = [...state.productsList,action.payload]
        },
        removeProductList: (state) => {
            state.productsList = [];
        }
    }
});

export const {addProductList,removeProductList} = productListSlice.actions;
export default productListSlice.reducer;