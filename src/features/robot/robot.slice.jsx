import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://68bbf6ff0f2491613eddbc1d.mockapi.io/robots";

export const fetchRobots = createAsyncThunk(
    "robots/fetchRobots", 
    async () => {
        const resp  = await fetch(API_URL);
        return await resp.json();
    }
);

export const deleteRobot = createAsyncThunk(
    "robots/deleteRobot",
    async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE"});
        return id;
    }
);

export const fetchRobotId = createAsyncThunk(
    "robots/robotDetail",
    async (id) => {
        const resp = await fetch(`${API_URL}/${id}`)
        return await resp.json();
    }
)

export const editRobot = createAsyncThunk(
    "robots/editRobot",
    async (robot) => {
        const resp = await fetch(`${API_URL}/${robot.id}`, 
        {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(robot),
        });
        return await resp.json();
    }
)

const robotSlice = createSlice({
    name: "robots",
    initialState: {
        data: [],
        loading: false,
        error: null,
        selectedRobot: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRobots.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchRobots.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            //state.totalRobot = action.payload.length;
        })
        .addCase(deleteRobot.fulfilled, (state, action) => {
            state.data = state.data.filter((robot) => robot.id != action.payload);
        })
        .addCase(fetchRobotId.fulfilled, (state, action) => {
            state.selectedRobot = action.payload;
        })
         .addCase(editRobot.pending, (state) => {
            state.loading = true;
        })
        .addCase(editRobot.fulfilled, (state, action) => {
            const index = state.data.findIndex((robot) => robot.id === action.payload.id);
            if(index !== -1){
                state.data[index] = action.payload;
            }
            state.selectedRobot = action.payload;
            state.loading = false;
        })
        .addCase(fetchRobots.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default robotSlice.reducer