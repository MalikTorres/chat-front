// importing create slice from reduct tool kit
import { createSlice } from '@reduxjs/toolkit';

// defining initial state as a socket slice
const initialState = {
  messages: [],
}
// create slice function to define the socket slice that is being defined
const socket = createSlice({
  name: 'socket',
  initialState,
// reducer property defines the add message reducer function. This function takes the state and action as parameter and updates those messages my pushing it into the message array.
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});
// exporting the add message function which can be used to invoke the add message function
export const { addMessage } = socket.actions;
// exporting the reducer function to represent the function function for the socket slice
export default socket.reducer;
