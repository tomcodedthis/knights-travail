import React from "react";

function Controls(props) {
  const setPosition = () => {
    const endValue = document.querySelector(".end-value").value;
    const newEndPosition = {
      col: endValue[0],
      row: endValue[1],
    };

    props.setEndPos(newEndPosition);
  };

  const stopTimers = () => {
    let timers = window.setTimeout(() => {}, 0);

    while (timers--) {
      window.clearTimeout(timers);
    }
  };

  return (
    <div
      className={`flex items-center justify-center gap-10 my-4 text-white text-2xl font-bold`}
    >
      <div className="flex gap-4 items-center">
        <div className="">End Position:</div>
        <input
          className="end-value text-center p-2 bg-transparent rounded border-1 border-white w-12"
          placeholder="a1"
          maxLength={2}
          pattern="/^[a-h][0-8]/g"
        ></input>
        <button
          className="bg-emerald-700 hover:bg-emerald-600 text-xl border-emerald-900 border-2 rounded px-2"
          onClick={setPosition}
        >
          Set
        </button>
        <button
          className="bg-orange-700 hover:bg-orange-600 text-xl border-red-900 border-2 rounded px-2"
          onClick={stopTimers}
        >
          Stop
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <div className="">Moves:</div>
        <MoveCounter moves={props.moves} />
      </div>
    </div>
  );
}

function MoveCounter(props) {
  return <div className="move-counter">{props.moves}</div>;
}

export default Controls;
