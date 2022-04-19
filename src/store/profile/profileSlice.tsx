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

export const getProfileRepos = createAsyncThunk(
  "profile/repos",
  async (user: string, { rejectWithValue }) => {
    try {
      const response = await profileService.getUserRepos(user);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

interface ProfileState {
  info: [];
  repos: [];
  loading: "idle" | "success" | "fail" | "pending";
}

const initialState = {
  info: [],
  repos: [],
  loading: "idle",
} as ProfileState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.info = action.payload;
        state.loading = "success";
      })
      .addCase(getProfileInfo.rejected, (state) => {
        state.loading = "fail";
      })
      .addCase(getProfileInfo.pending, (state) => {
        state.loading = "pending";
      });
    builder
      .addCase(getProfileRepos.fulfilled, (state, action) => {
        state.repos = action.payload;
        state.loading = "success";
      })
      .addCase(getProfileRepos.rejected, (state) => {
        state.loading = "fail";
      })
      .addCase(getProfileRepos.pending, (state) => {
        state.loading = "pending";
      });
  },
});

export default profileSlice.reducer;
