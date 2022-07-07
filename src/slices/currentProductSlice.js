import { createSlice } from "@reduxjs/toolkit";

export const currentProductSlice = createSlice({
    name: "currentProduct",
    initialState: {
        currentProduct: {}
    },
    reducers: {
        addCurrentProduct: (state,action) => {
            state.currentProduct = action.payload;
        }
    }
});

export const {addCurrentProduct} = currentProductSlice.actions;
export default currentProductSlice.reducer;