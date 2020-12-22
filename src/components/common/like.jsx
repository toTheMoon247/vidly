import React, { Component } from "react";

const Like = (props) => {
  let classes = "cursor-pointer fa fa-heart";
  if (!props.liked) classes += "-o";
  return(
    <i
      className={classes}
      onClick={props.onClick}>
    </i>
  );
}

export default Like;
