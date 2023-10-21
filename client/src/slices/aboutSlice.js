import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    abouts: [],
  },
  reducers: {
    getAbout: (state, action) => {
      state.abouts = action.payload.map((about) => {
        return { id: about._id, name: about.name, info: about.info };
      });
    },
    updateAbout: (state, action) => {
      const index = state.abouts.findIndex((x) => x.id === action.payload.id);
      state.abouts[index] = {
        id: action.payload.id,
        name: action.payload.name,
        info: action.payload.info,
        roles: action.payload.roles,
      };
    },
  },
});

export const { getAbout, updateAbout } = aboutSlice.actions;
export default aboutSlice.reducer;
