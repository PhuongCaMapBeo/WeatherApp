import { createSlice } from "@reduxjs/toolkit"

export const searchSlice = createSlice({
  name: "search",
  initialState:{
    search: false,
    loc: undefined
  },
  reducers: {
    searchHistory(state) {
      state.search = !state.search;
    },
    locHistory(state,action){
      state.loc = action.payload;
    }
    // ...các action khác
  },
})
