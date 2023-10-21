import { createSlice } from "@reduxjs/toolkit";

const educationSlice = createSlice({
  name: "educations",
  initialState: {
    educations: [],
  },
  reducers: {
    getEducation: (state, action) => {
      state.educations = action.payload.map((education) => {
        return {
          id: education._id,
          title: education.title,
          description: education.description,
          school: education.school,
          startDate: education.startDate,
          endDate: education.endDate,
          image: education.image,
        };
      });
    },
    addEducation: (state, action) => {
      state.educations.push(action.payload);
    },
    editEducation: (state, action) => {
      const index = state.educations.findIndex(
        (x) => x.id === action.payload.id
      );
      if (index !== -1) {
        state.educations[index] = {
          ...state.educations[index], // Copy the existing education
          title: action.payload.title,
          description: action.payload.description,
          school: action.payload.school,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          image: action.payload.image,
        };
      }
    },

    deleteEducation: (state, action) => {
      const id = action.payload.id;
      state.educations = state.educations.filter((u) => u.id !== id);
    },
  },
});

export const { getEducation, addEducation, editEducation, deleteEducation } =
  educationSlice.actions;
export default educationSlice.reducer;
