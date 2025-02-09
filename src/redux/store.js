"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Categories from "./Reducers/categoriesReducer";
import * as Movies from "./Reducers/moviesReducer";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.updateProfileReducer,
  userDeleteProfile: User.deleteProfileReducer,
  userChangePassword: User.changePasswordReducer,
  userGetFavoriteMovies: User.getFavoriteMoviesReducer,
  userDeleteFavoriteMovies: User.deleteFavoriteMoviesReducer,
  userLikeMovie: User.userLikeMovieReducer,
  // admin reducers
  adminGetAllUsers: User.getAllUsersReducer,
  adminDeleteUser: User.deleteUserReducer,
  // categories reducers
  categoryGetAll: Categories.getAllCategoryReducer,
  categoryCreate: Categories.createCategoryReducer,
  categoryUpdate: Categories.updateCategoryReducer,
  categoryDelete: Categories.deleteCategoryReducer,
  // movies reducers
  getAllMovies: Movies.getAllMoviesReducer,
  moviesDetails: Movies.movieDetailsReducer,
  randomMovies: Movies.getRandomMoviesReducer,
  topRatedMovies: Movies.getTopRatedMoviesReducer,
  createReview: Movies.createReviewMovieReducer,
  deleteMovie: Movies.deleteMovieReducer,
  deleteAllMovies: Movies.deleteAllMoviesReducer,
  createMovie: Movies.createMovieReducer,
  updateMovie: Movies.updateMovieReducer,
  castsMovie: Movies.CastsReducer,
});

// get userInfo from local storage
const userInfoFromStorage =
  typeof window !== "undefined" && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
