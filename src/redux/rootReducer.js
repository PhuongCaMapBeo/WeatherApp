import { createSlice } from "@reduxjs/toolkit";

export const setSlice = createSlice({
  name: "set",
  initialState:{
    temp: "C",
    wind :"Km",
    language: "vn",
    numberOfDay: 7,
  },
  reducers: {
    setTempF(state, action) {
      state.temp = "F"
      console.log(action.payload)
    },

    setTempC(state, action) {
      state.temp = "C"
    },
    setWindKm(state) {
      state.wind = "Km"
    },
    setWindMil(state, action) {
      state.wind = "Mil"
    },
    setLanguageVn(state, action) {
      state.language = "vn"
    },
    setLanguageEn(state) {
      state.language = "en"
    },
  }

})