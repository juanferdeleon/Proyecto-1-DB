import { combineReducers } from "redux";
import * as types from "../types/shoppingcart";

const albums = (state = null, action) => {
  switch (action.type) {
    case types.ALBUM_ADDED_SHOPPING_CART:
      const newState = { ...state };
      newState[action.payload.albumInfo.albumid] = {
        ...action.payload.albumInfo,
      };
      return newState;
    default:
      return state;
  }
};
const tracks = (state = null, action) => {
  switch (action.type) {
    case types.TRACK_ADDED_SHOPPING_CART:
      const newState = { ...state };
      newState[action.payload.trackInfo.id] = { ...action.payload.trackInfo };
      return newState;
    default:
      return state;
  }
};

const shoppingCart = combineReducers({
  albums,
  tracks,
});

export default shoppingCart;

export const getAlbums = (state) => state.albums;
export const getTracks = (state) => state.tracks;
