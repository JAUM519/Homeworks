import { createSlice } from '@reduxjs/toolkit';

const stackSlice = createSlice({
  name: 'stack',
  initialState: {
    items: []
  },
  reducers: {
    push: (state, action) => {
      state.items.push(action.payload);
    },
    pop: (state) => {
      state.items.pop();
    }
  }
});

export const { push, pop } = stackSlice.actions;
export default stackSlice.reducer;
