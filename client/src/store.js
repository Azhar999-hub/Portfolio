import { configureStore } from "@reduxjs/toolkit";

import aboutReducer from "./slices/aboutSlice";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import educationReducer from "./slices/educationSlice";
import experienceReducer from "./slices/experienceSlice";
import messageReducer from "./slices/messageSlice";
import projectReducer from "./slices/projectSlice";
import skillReducer from "./slices/skillSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    skills: skillReducer,
    abouts: aboutReducer,
    experiences: experienceReducer,
    projects: projectReducer,
    education: educationReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
