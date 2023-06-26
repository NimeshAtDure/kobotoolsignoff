import { createSlice } from '@reduxjs/toolkit'

export const appReducer = createSlice({
  name: 'user',
  initialState: {
    token: sessionStorage.getItem("token") || '',
    data: sessionStorage.getItem("user") || ''
  },
  reducers: {
    settoken: (state, action) => {
      state.token = action.payload
    },
    setdata:(state,action) =>{
      state.data = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {settoken,setdata} = appReducer.actions

export default appReducer.reducer