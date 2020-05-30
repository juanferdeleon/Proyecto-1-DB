import React from "react";
import { connect } from "react-redux";
import * as selectors from "../../reducers/index";
import "./styles.css";

const InitUserHome = () => {
  return (
    <div>
      <h3 className="hometitle">Busca una cancion!</h3>
      <img src="https://cdn.onlinewebfonts.com/svg/img_375331.png" />
    </div>
  );
};
const itemStyle = {
  padding: "20px",
  borderRadius: "40px",
  margin: "20px",
  marginBottom: "50px",
  background: "#ACC5EB",
};
const containerStyles = {
  display: "flex",
  flexWrap: "wrap",
};
const SongsFound = ({
  albumByArtist,
  albumByAlbumName,
  trackByTrackName,
  trackByGenre,
}) => {
  return (
    <div className="jumbotron media">
      <div>
        <h3>Albums</h3>
        <div className="AlbumContainer" style={containerStyles}>
          {Object.values(albumByArtist).map((album) => {
            return (
              <div className="jumbotron media" style={itemStyle}>
                <img
                  classname=""
                  src="https://cdn.onlinewebfonts.com/svg/img_375331.png"
                />
                <div className="media-body">
                  <h5 className="mt-0">{album.name}</h5>
                  <hr></hr>
                  <div className="ml-4 text-cente row align-self-end">
                    <div className="col-7">Aritsta:</div>
                    <div className="col-4">{album.artist}</div>
                  </div>
                  <hr></hr>
                </div>
              </div>
            );
          })}
          {Object.values(albumByAlbumName).map((album) => {
            return (
              <div className="jumbotron media" style={itemStyle}>
                <img
                  classname=""
                  src="https://cdn.onlinewebfonts.com/svg/img_375331.png"
                />
                <div className="media-body">
                  <h5 className="mt-0">{album.name}</h5>
                  <hr></hr>
                  <div className="ml-4 text-cente row align-self-end">
                    <div className="col-7">Aritsta:</div>
                    <div className="col-4">{album.artist}</div>
                  </div>
                  <hr></hr>
                </div>
              </div>
            );
          })}
        </div>
        <h3>Canciones</h3>
        <div className="songsContainer" style={containerStyles}>
          {Object.values(trackByTrackName).map((track) => {
            return (
              <div className="jumbotron media" style={itemStyle}>
                <img
                  classname=""
                  src="https://cdn.onlinewebfonts.com/svg/img_375331.png"
                />
                <div className="media-body">
                  <h5 className="mt-0">{track.name}</h5>
                  <hr></hr>
                  <div className="ml-4 text-cente row align-self-end">
                    <div className="col-7">Aritsta:</div>
                    <div className="col-4">{track.artist}</div>
                  </div>
                  <hr></hr>
                </div>
              </div>
            );
          })}
        </div>
        <h3>Género</h3>
        <div className="genreContainer" style={containerStyles}>
          {Object.values(trackByGenre).map((track) => {
            return (
              <div className="jumbotron media" style={itemStyle}>
                <img
                  classname=""
                  src="https://cdn.onlinewebfonts.com/svg/img_375331.png"
                />
                <div className="media-body">
                  <h5 className="mt-0">{track.name}</h5>
                  <hr></hr>
                  <div className="ml-4 text-cente row align-self-end">
                    <div className="col-7">Aritsta:</div>
                    <div className="col-4">{track.artist}</div>
                  </div>
                  <hr></hr>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Songs = connect((state) => ({
  albumByArtist: selectors.getAlbumByArtist(state),
  albumByAlbumName: selectors.getAlbumByName(state),
  trackByTrackName: selectors.getTrackByName(state),
  trackByGenre: selectors.getTrackByGenre(state),
}))(SongsFound);

const UserHome = ({ songsLoaded }) => {
  return (
    <div className="user-home-wrapper">
      <div className="description">
        {songsLoaded ? <Songs /> : <InitUserHome />}
      </div>
    </div>
  );
};

export default connect((state) => ({
  songsLoaded: selectors.getSongsLoaded(state),
}))(UserHome);
