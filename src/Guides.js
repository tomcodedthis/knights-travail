import React from "react";

function Guide(props) {
  let container = [];
  let params = {
    size: "",
    padding: "",
  };

  props.direction === "row"
    ? (params.size = "h-[4rem]")
    : (params.size = "w-[4rem]");

  props.direction === "row"
    ? (params.padding = "px-2")
    : (params.padding = "py-2");

  props.entries.forEach((entry) => {
    container.push(
      <div
        key={`guide-${props.entries.indexOf(entry)}`}
        className={`flex items-end ${params.size} ${params.padding}`}
      >
        {entry}
      </div>
    );
  });

  return (
    <>
      <div
        className={`grid grid-${props.direction}s-8 text-white text-2xl font-bold`}
      >
        {container}
      </div>
    </>
  );
}

export default Guide;
