import { createAppSlice } from "@/store/createAppSlice";
import AuthApi, { SignInRequestBody } from "@/api/authApi";
import Cookies from "js-cookie";

// Authority Interface
interface Authority {
  id: number;
  name: string;
  title: string;
  description: string;
}

// Role Interface
export interface Role {
  id: number;
  name: string;
  label: string;
  description: string;
  authorities: Authority[];
}
// User Interface
export interface User {
  firstName: string;
  lastName: string;
  reference: number;
  role: Role | null;
}

// User Interface
export interface UserSliceState {
  isAuthenticated: boolean;
  status: Status;
  signInStatus: Status;
  user: User;
}

export type Status = "idle" | "loading" | "failed";

const initialState: UserSliceState = {
  isAuthenticated: false,
  status: "idle",
  signInStatus: "idle",
  user: {
    firstName: "",
    lastName: "",
    reference: 0,
    role: null,
  },
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    fetchCurrentUser: create.asyncThunk(
      async () => {
        const response = await AuthApi.getCurrentUser();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload;
          state.isAuthenticated = true;
        },
        rejected: (state) => {
          state.status = "failed";
          state.isAuthenticated = false;
        },
      }
    ),
    signInUser: create.asyncThunk(
      async (signInRequestBody: SignInRequestBody) => {
        const response = await AuthApi.signInUser(signInRequestBody);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      },
      {
        pending: (state) => {
          state.signInStatus = "loading";
        },
        fulfilled: (state, action) => {
          state.signInStatus = "idle";
          state.user = action.payload.user;
          state.isAuthenticated = true;
          Cookies.set("token", action.payload.token);
        },
        rejected: (state) => {
          state.signInStatus = "failed";
          state.isAuthenticated = false;
        },
      }
    ),
    logOutUser: create.reducer((state) => {
      Cookies.remove("token");
      state.user = initialState.user;
      state.isAuthenticated = false;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectStatus: (state) => state.status,
    selectSignInStatus: (state) => state.signInStatus,
    selectUser: (state) => state.user,
  },
});

// Action creators are generated for each case reducer function.
export const { fetchCurrentUser, signInUser, logOutUser } = userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectIsAuthenticated, selectUser, selectSignInStatus } =
  userSlice.selectors;
