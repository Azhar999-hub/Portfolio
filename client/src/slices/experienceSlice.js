import { createSlice } from "@reduxjs/toolkit";

const experienceSlice = createSlice({
  name: "experiences",
  initialState: {
    experiences: [],
  },
  reducers: {
    getExperience: (state, action) => {
      state.experiences = action.payload.map((experience) => {
        return {
          id: experience._id,
          title: experience.title,
          company: experience.company,
          city: experience.city,
          startDate: experience.startDate,
          endDate: experience.endDate,
          description: experience.description,
          technologies: experience.technologies,
          image: experience.image,
        };
      });
    },
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
    },
    editExperience: (state, action) => {
      const index = state.experiences.findIndex(
        (x) => x.id === action.payload.id
      );
      if (index !== -1) {
        state.experiences[index] = {
          ...state.experiences[index], // Copy the existing experience
          title: action.payload.title,
          company: action.payload.company,
          city: action.payload.city,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          description: action.payload.description,
          technologies: action.payload.technologies,
          image: action.payload.image,
        };
      }
    },

    deleteExperience: (state, action) => {
      const id = action.payload.id;
      state.experiences = state.experiences.filter((u) => u.id !== id);
    },
  },
});

export const {
  getExperience,
  addExperience,
  editExperience,
  deleteExperience,
} = experienceSlice.actions;
export default experienceSlice.reducer;
