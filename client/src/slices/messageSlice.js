import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload.map((message) => {
        return {
          id: message._id,
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          isSeen: message.isSeen,
        };
      });
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    editMessage: (state, action) => {
      const index = state.messages.findIndex(
        (message) => message.id === action.payload.id
      );
      if (index !== -1) {
        state.messages[index] = {
          ...state.messages[index], // Copy the existing message
          name: action.payload.name,
          email: action.payload.email,
          subject: action.payload.subject,
          message: action.payload.message,
          isSeen: action.payload.isSeen,
        };
      }
    },
    deleteMessage: (state, action) => {
      const id = action.payload.id;
      state.messages = state.messages.filter((message) => message.id !== id);
    },
  },
});

export const {
  getMessages,
  addMessage,
  editMessage,
  deleteMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
