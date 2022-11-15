import React, { useState } from "react";
import "./Controls";
import Controls from "./Controls";
import FollowShape from "./FollowShape";
import Guide from "./Guides";
import SquareBtn from "./Square";

function Board() {
  const [startPos, setStartPos] = useState({
    col: "a",
    row: 1,
  });
  const [endPos, setEndPos] = useState({
    col: "h",
    row: 8,
  });
  const [moves, setMoves] = useState(0);
  const [piece] = useState("horse");
  const layout = {
    columns: ["a", "b", "c", "d", "e", "f", "g", "h"],
    rows: [1, 2, 3, 4, 5, 6, 7, 8].reverse(),
  };

  const setStart = (position) => {
    if (Object.values(position).includes(undefined)) return;

    setStartPos((startPos.col = position.col), (startPos.row = position.row));
  };

  const setEnd = (position) => {
    if (Object.values(position).includes(undefined)) return;

    setEndPos((endPos.col = position.col), (endPos.row = position.row));
  };

  const increaseMoves = () => {
    setMoves(moves + 1);
  };

  const resetMoves = () => {
    setMoves(moves - moves);
  };

  let container = [];

  layout.rows.forEach((row) => {
    layout.columns.forEach((col) => {
      const number = layout.columns.indexOf(col) + layout.rows.indexOf(row) + 2;
      let shade;

      number % 2 === 0 ? (shade = "white") : (shade = "black");

      const btn = (
        <SquareBtn
          key={col + row}
          layout={layout}
          shade={shade}
          position={{ colIndx: col, rowIndx: row }}
          setMoves={increaseMoves}
          piece={piece}
          endPos={endPos}
        />
      );

      container.push(btn);
    });
  });

  return (
    <>
      <div className="screen flex flex-col justify-end items-end">
        <Guide entries={layout.columns} direction="col" />

        <div className="flex">
          <Guide entries={layout.rows} direction="row" />

          <div className="board flex">{container}</div>
        </div>

        <FollowShape />
        <Controls
          startPosition={startPos}
          setStartPos={setStart}
          endPosition={endPos}
          setEndPos={setEnd}
          layout={layout}
          moves={moves}
          resetMoves={resetMoves}
        />
      </div>
    </>
  );
}

export default Board;
