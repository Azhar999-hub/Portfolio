import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
  },
  reducers: {
    getAllSkills: (state, action) => {
      state.skills = action.payload.map((skill) => {
        return { id: skill._id, type: skill.type, level: skill.level };
      });
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action) => {
      const index = state.skills.findIndex((x) => x.id === action.payload.id);
      state.skills[index] = {
        id: action.payload.id,
        type: action.payload.type,
        level: action.payload.level,
      };
    },
    deleteSkill: (state, action) =>{
      const id = action.payload.id;
      state.skills =state.skills.filter(u => u.id !== id)
    }
  },
});

export const { getAllSkills, addSkill, updateSkill, deleteSkill } = skillSlice.actions;
export default skillSlice.reducer;
