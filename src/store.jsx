import { configureStore } from "@reduxjs/toolkit";
import robotReducer from "./features/robot/robot.slice"

export const store = configureStore({
    reducer: {
        robots: robotReducer,
    }
});