import React from "react";

function FollowShape() {
  return (
    <div className={`follow-shape`} onLoad={setFollowDefault}>
      <img src={require("./knight.png")} alt="knight"></img>
    </div>
  );
}

export function setFollowDefault() {
  const follow = document.querySelector(".follow-shape");
  const square = document.querySelector(".square[position='a1']");

  square.append(follow);
}

export function movePiece(position) {
  const follow = document.querySelector(".follow-shape");
  const square = document.querySelector(
    `.square[position="${Object.values(position).join("")}"]`
  );

  follow.parentElement.removeChild(follow);
  square.append(follow);
}

export default FollowShape;
