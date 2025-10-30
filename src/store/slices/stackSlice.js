import { createSlice } from '@reduxjs/toolkit'

// Pila en Redux
const initialState = {
  items: [],
}

export const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    push: (state, action) => { state.items.push(action.payload) },
    pop: (state) => { if (state.items.length) state.items.pop() },
    clear: (state) => { state.items = [] },
  },
})

export const { push, pop, clear } = stackSlice.actions
export default stackSlice.reducer
