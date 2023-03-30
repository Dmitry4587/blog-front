import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IUser, IAuthUser } from "../types";
import handleServerError from "../../utils/handleServerError";

export const authUser = createAsyncThunk(
  "auth/authUser",
  async (loginFormData: Pick<IUser, "email" | "password">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IAuthUser>("/user/login", loginFormData);
      return data;
    } catch (e) {
      const err = handleServerError(e);
      return rejectWithValue(err);
    }
  }
);

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IUser>("/user/me");
    return data;
  } catch (e) {
    const err = handleServerError(e);
    return rejectWithValue(err);
  }
});

export const registrUser = createAsyncThunk(
  "auth/registrUser",
  async (registrFormData: Omit<IUser, "_id">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<IAuthUser>("/user/registr", registrFormData);
      return data;
    } catch (e) {
      const err = handleServerError(e);
      return rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (registrFormData: Omit<IUser, "_id">, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch<IUser>("/user/update", registrFormData);
      return data;
    } catch (e) {
      const err = handleServerError(e);
      return rejectWithValue(err);
    }
  }
);
