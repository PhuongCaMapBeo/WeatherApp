import { configureStore } from "@reduxjs/toolkit";
import { setSlice } from "./setSlice";
import { searchSlice } from "./searchSlice";

const store = configureStore({
  reducer:{
    set: setSlice.reducer, 
    search: searchSlice.reducer
  }
})

export default store;