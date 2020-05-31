import React from "react";
import Traks from "../userHome/Traks/tracks";
import * as selectors from "../../reducers";

import "./styles.css";
import { connect } from "react-redux";

const MySongs = ({ myTracks }) => {
  return (
    <div className="my-songs-main-container">
      {myTracks
        ? Object.values(myTracks).map((track) => <Traks track={track} />)
        : null}
    </div>
  );
};

export default connect((state) => ({
  myTracks: selectors.getShoppingCartTracks(state),
}))(MySongs);
