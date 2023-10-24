import { createSlice } from "@reduxjs/toolkit"

export const setSlice = createSlice({
  name: "set",
  initialState:{
    temp: "c",
    wind: "k",
    language : "vn",
    numberOfDay: 7,
  },
  reducers: {
    setTemp(state, action) {
      state.temp = action.payload
      console.log(action.payload)
    },

    setWind(state, action) {
      state.wind = action.payload
    },
    setLanguage(state, action) {
      state.language = action.payload
    },
   setNumberOfDay(state,action){
    console.log("numberday", action.payload)
    state.numberOfDay = action.payload
   },
    // ...các action khác
  },
})

