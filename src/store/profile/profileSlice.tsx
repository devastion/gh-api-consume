import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

export const getProfileInfo = createAsyncThunk(
  "profile/info",
  async (user: string, { rejectWithValue }) => {
    try {
      const response = await profileService.getUserInfo(user);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

interface ProfileState {
  data: [];
  loading: "idle" | "success" | "fail" | "pending";
}

const initialState = {
  data: [],
  loading: "idle",
} as ProfileState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = "success";
      })
      .addCase(getProfileInfo.rejected, (state) => {
        state.loading = "fail";
      })
      .addCase(getProfileInfo.pending, (state) => {
        state.loading = "pending";
      });
  },
});

export default profileSlice.reducer;
