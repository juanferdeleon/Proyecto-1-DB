import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// import * as selectors from "../../../reducers";
import * as actions from "../../../actions/shoppingcart";

import "./styles.css";

const itemStyle = {
  padding: "20px",
  borderRadius: "40px",
  margin: "20px",
  marginBottom: "50px",
  background: "#ACC5EB",
};

const Track = ({ track, onClick }) => {
  return (
    <div className="" style={itemStyle}>
      <img
        classname=""
        src="https://cdn.onlinewebfonts.com/svg/img_375331.png"
      />
      <div className="">
        <h5 className="">{track.name}</h5>
        <hr></hr>
        <div className="info">
          <div className="">
            <div className="">Aritsta:</div>
            <div className="">{track.artist}</div>
          </div>
          <div className="add-shopping-cart" onClick={() => onClick(track)}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  onClick(track) {
    dispatch(actions.addTrack(track));
  },
}))(Track);
