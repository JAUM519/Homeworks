import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import stackReducer from '../features/stack/stackSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stack: stackReducer,
  },
});
