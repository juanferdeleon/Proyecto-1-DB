import React from "react";
import ShoppingRow from "./ShoppingRow/shoppingrow";
import { connect } from "react-redux";

import * as selectors from "../../reducers";

import "./styles.css";
import makeRequest from "../requests";

const ShoppingCart = ({ tracks, albums, onClick, currentUser }) => {
  return (
    <div className="shopping-cart-main-container">
      <div className="receipt-container">
        <h2>Detalle de Compra</h2>
        <hr></hr>
        <div className="receipt-headers">
          <div className="receipt-description">
            <h4>Description</h4>
          </div>
          <div className="receipt-price">
            <h4>Price</h4>
          </div>
        </div>
        <div className="rows-container">
          {tracks
            ? Object.values(tracks).map((track) => (
                <ShoppingRow trackInfo={track} />
              ))
            : null}
          {albums
            ? Object.values(albums).map((album) => (
                <ShoppingRow albumInfo={album} />
              ))
            : null}
        </div>
        <div
          className="shopping-cart-btn"
          onClick={() => onClick(tracks, albums, currentUser)}
        >
          Comprar
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    tracks: selectors.getShoppingCartTracks(state),
    albums: selectors.getShoppingCartAlbums(state),
    currentUser: selectors.getUser(state),
  }),
  (dispatch) => ({
    onClick(tracks, albums, currentUser) {
      let fullTracksList = {};
      fullTracksList = { ...tracks };
      Object.values(albums).map((album) => {
        Object.values(album.tracks).map((track) => {
          fullTracksList[track.trackid] = { ...track };
        });
      });

      const values = {
        fullTracksList,
        currentUser,
      };

      const requestInfo = {
        uri: `http://localhost:8000/buy-songs`,
        type: "POST",
      };
      makeRequest(values, requestInfo, (res) => {
        console.log(res);
      });
    },
  })
)(ShoppingCart);
