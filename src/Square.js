import React, { useState } from "react";
import { movePiece } from "./FollowShape";

function SquareBtn(props) {
  const [Active, setActive] = useState({
    isActive: false,
    shade: props.shade,
  });
  const columns = props.layout.columns;
  const rows = props.layout.rows;
  let currentPosition = { x: "a", y: 1 };

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

  const NextMoves = () => {
    let colStart = columns.indexOf(props.position.colIndx);
    let rowStart = rows.indexOf(props.position.rowIndx);

    currentPosition = { x: columns[colStart], y: rows[rowStart] };
    movePiece(currentPosition);

    if (props.piece === "horse") {
      const exclude = [undefined, -1, 0, 9, 10];
      let nextPositions = [];
      let nextOptions = [
        { x: columns[colStart + 1], y: rows[rowStart] + 2 },
        { x: columns[colStart + 1], y: rows[rowStart] - 2 },
        { x: columns[colStart + 2], y: rows[rowStart] + 1 },
        { x: columns[colStart + 2], y: rows[rowStart] - 1 },
        { x: columns[colStart - 1], y: rows[rowStart] + 2 },
        { x: columns[colStart - 1], y: rows[rowStart] - 2 },
        { x: columns[colStart - 2], y: rows[rowStart] + 1 },
        { x: columns[colStart - 2], y: rows[rowStart] - 1 },
      ];

      nextOptions.forEach((position) => {
        if (!exclude.some((excl) => Object.values(position).includes(excl)))
          nextPositions.push(position);
      });

      nextPositions.forEach((position) => {
        const square = document.querySelector(
          `.square[position="${Object.values(position).join("")}"]`
        );

        square.classList.contains("highlight")
          ? square.classList.remove("highlight")
          : square.classList.add("highlight");
      });

      ClickNext(nextPositions);
    }
  };

  const ClickNext = (positions) => {
    const rndmPos = positions[Math.floor(Math.random() * positions.length)];
    const rndmSquare = document.querySelector(
      `.square[position="${Object.values(rndmPos).join("")}"]`
    );

    if (EndIsOption(positions)) {
      Finish();

      return (
        <button
          className={`square ${Active.isActive ? "lightgreen" : Active.shade}`}
          position={`${props.position.colIndx}${props.position.rowIndx}`}
          onClick={ActiveSqr}
        ></button>
      );
    } else {
      if (
        rndmSquare.getAttribute("position") ===
        Object.values(props.endPos).join("")
      )
        return Finish();

      setTimeout(() => {
        rndmSquare.click();
      }, 1000);
    }
  };

  const EndIsOption = (positions) => {
    return positions.some((position) => {
      if (
        Object.values(position).join("") ===
        Object.values(props.endPos).join("")
      )
        return true;
      return false;
    });
  };

  const Finish = () => {
    movePiece(props.endPos);
    ClearBoard();
    return window.alert("done");
  };

  return (
    <button
      className={`square ${Active.isActive ? "lightgreen" : Active.shade}`}
      position={`${props.position.colIndx}${props.position.rowIndx}`}
      onClick={() => {
        props.setMoves();
        ActiveSqr();
        ClearBoard();
        NextMoves();
      }}
      onContextMenu={RightClick}
    ></button>
  );
}

export default SquareBtn;
