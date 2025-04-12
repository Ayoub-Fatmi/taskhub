// A slice for your games shelf
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'games', // Shelf label
  initialState: { // Default contents
  },
  reducers: {
    // addGame: (state, action) => {
    //   state.list.push(action.payload); // Add new game
    // },
    // completeGame: (state, action) => {
    //   state.completed.push(action.payload); // Mark as completed
    // }
  }
});

export default tasksSlice.reducer