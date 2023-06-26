import { createSlice } from '@reduxjs/toolkit'

export const appReducer = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    settoken: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {settoken} = appReducer.actions

export default appReducer.reducer