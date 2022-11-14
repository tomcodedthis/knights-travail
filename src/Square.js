import React, { useState } from "react";

function SquareBtn(props) {
  const [Active, setActive] = useState({
    isActive: false,
    shade: props.shade,
  });

  const ActiveSqr = () => {
    setActive({
      ...Active,
      isActive: !Active.isActive,
    });
  };

  const ClearBoard = () => {
    const squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
      if (square.classList.contains("highlight"))
        square.classList.remove("highlight");
    });
  };

  const RightClick = (e) => {
    e.preventDefault();

    const thisSquare = document.querySelector(
      `.square[position="${props.position.colIndx}${props.position.rowIndx}"]`
    );

    thisSquare.classList.contains("highlight")
      ? thisSquare.classList.remove("highlight")
      : thisSquare.classList.add("highlight");
  };

  return (
    <button
      className={`square ${Active.isActive ? "lightgreen" : Active.shade}`}
      position={`${props.position.colIndx}${props.position.rowIndx}`}
      onClick={() => {
        props.setMoves();
        ActiveSqr();
        ClearBoard();
      }}
      onContextMenu={RightClick}
    ></button>
  );
}

export default SquareBtn;
