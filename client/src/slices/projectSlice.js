import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {
    getProject: (state, action) => {
      state.projects = action.payload.map((project) => {
        return {
          id: project._id,
          title: project.title,
          descriptions: project.descriptions,
          technologies: project.technologies,
          image: project.image,
        };
      });
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    editProject: (state, action) => {
      const index = state.projects.findIndex((x) => x.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index], // Copy the existing project
          title: action.payload.title,
          descriptions: action.payload.descriptions,
          technologies: action.payload.technologies,
          image: action.payload.image,
        };
      }
    },

    deleteProject: (state, action) => {
      const id = action.payload.id;
      state.projects = state.projects.filter((u) => u.id !== id);
    },
  },
});

export const { getProject, addProject, editProject, deleteProject } =
  projectSlice.actions;
export default projectSlice.reducer;
