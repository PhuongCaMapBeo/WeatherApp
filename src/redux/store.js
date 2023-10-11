import { configureStore } from "@reduxjs/toolkit";
import { setSlice } from "./setSlice";

const store = configureStore({
  reducer:{
    set: setSlice.reducer, 
  }
})

export default store;