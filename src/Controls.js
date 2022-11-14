import React from "react";
import { movePiece } from "./FollowShape";
import searchTree from "./searchTree";

function Controls(props) {
  const setPosition = () => {
    const startValue = document.querySelector(".start-value").value;
    const newStartPosition = {
      col: startValue[0],
      row: parseInt(startValue[1]),
    };
    props.setStartPos(newStartPosition);

    const endValue = document.querySelector(".end-value").value;
    const newEndPosition = {
      col: endValue[0],
      row: parseInt(endValue[1]),
    };
    props.setEndPos(newEndPosition);
  };

  const stopTimers = () => {
    let timers = window.setTimeout(() => {}, 0);

    while (timers--) {
      window.clearTimeout(timers);
    }
  };

  const NextMoves = () => {
    const columns = props.layout.columns;
    const rows = props.layout.rows;
    
    let pathArray = searchTree(
      Object.values(props.startPosition).join(""),
      Object.values(props.endPosition).join(""),
      { cols: columns, rows: rows }
    );

    clickNext(pathArray);
  };

  return (
    <div
      className={`flex items-center justify-center gap-6 my-4 text-white text-2xl font-bold`}
    >
      <div className="flex gap-2 items-center">
        <div className="">Start:</div>
        <input
          className="start-value text-center p-2 bg-transparent rounded border-1 border-white w-12"
          placeholder="a1"
          maxLength={2}
          pattern="/^[a-h][0-8]/g"
        ></input>
        <div className="">End:</div>
        <input
          className="end-value text-center p-2 bg-transparent rounded border-1 border-white w-12"
          placeholder="h8"
          maxLength={2}
          pattern="/^[a-h][0-8]/g"
        ></input>
        <button
          className="bg-emerald-700 hover:bg-emerald-600 text-xl border-emerald-900 border-2 rounded px-2"
          onClick={() => {
            setPosition();
            setTimeout(NextMoves(), 100);
          }}
        >
          Start
        </button>
        <button
          className="bg-orange-700 hover:bg-orange-600 text-xl border-red-900 border-2 rounded px-2"
          onClick={stopTimers}
        >
          Stop
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="">Moves:</div>
        <MoveCounter moves={props.moves} />
      </div>
    </div>
  );
}

function MoveCounter(props) {
  return <div className="move-counter">{props.moves}</div>;
}

async function clickNext(pathArray) {
  if (pathArray.length === 0) return;
  await timer(1000);

  const position = pathArray.shift();
  document.querySelector(`.square[position="${position}"]`).click();

  movePiece(position);
  clickNext(pathArray);
}

const timer = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), time);
  });
};

export default Controls;
