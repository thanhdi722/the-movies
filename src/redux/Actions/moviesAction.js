"use client";
import * as MoviesConstants from "../Constants/moviesConstants";
import * as MoviesAPIs from "../APIs/MoviesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// get all movies action
export const getAllMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_LIST_REQUEST });
    const response = await MoviesAPIs.getAllMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_LIST_FAIL);
  }
};
// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_RANDOM_REQUEST });
    const response = await MoviesAPIs.getRandomMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_RANDOM_FAIL);
  }
};

// get movie by id action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_DETAILS_REQUEST });
    const response = await MoviesAPIs.getMovieByIdService(id);
    dispatch({
      type: MoviesConstants.MOVIES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_DETAILS_FAIL);
  }
};

// get top rated movies action
export const getTopRatedMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_TOP_RATED_REQUEST });
    const response = await MoviesAPIs.getTopRatedMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_TOP_RATED_FAIL);
  }
};

// create review action
export const createReviewAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MoviesConstants.CREATE_REVIEW_REQUEST });
      const response = await MoviesAPIs.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: MoviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review created successfully");
      dispatch({ type: MoviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, MoviesConstants.CREATE_REVIEW_FAIL);
    }
  };

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.DELETE_MOVIE_REQUEST });
    const response = await MoviesAPIs.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: MoviesConstants.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.DELETE_MOVIE_FAIL);
  }
};

// delete all movies action
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await MoviesAPIs.deleteAllMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: MoviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("All movies deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

// create new movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.CREATE_MOVIE_REQUEST });
    const response = await MoviesAPIs.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: MoviesConstants.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie created successfully");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.CREATE_MOVIE_FAIL);
  }
};

// update movie action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.UPDATE_MOVIE_REQUEST });
    const response = await MoviesAPIs.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({
      type: MoviesConstants.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie updated successfully");
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.UPDATE_MOVIE_FAIL);
  }
};

// ************ CASTS ***********************

// add cast action
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: MoviesConstants.ADD_CASTS, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().castsMovie.casts));
};

// remove cast action
export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: MoviesConstants.DELETE_CASTS, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().castsMovie.casts));
};

// update cast action
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: MoviesConstants.EDIT_CASTS, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().castsMovie.casts));
};

// delete all cast action
export const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: MoviesConstants.RESEST_CASTS });
  localStorage.removeItem("casts");
};
