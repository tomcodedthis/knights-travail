function searchTree(start, end, axis) {
  let visited = [];
  let queue = [];

  const NextPos = (startPos) => {
    let colStart = axis.cols.indexOf(startPos.split("")[0]);
    let rowStart = axis.rows.indexOf(parseInt(startPos.split("")[1]));

    const exclude = [undefined, -1, 0, 9, 10];
    let nextPositions = [];
    let nextOptions = [
      { x: axis.cols[colStart + 1], y: axis.rows[rowStart] + 2 },
      { x: axis.cols[colStart + 1], y: axis.rows[rowStart] - 2 },
      { x: axis.cols[colStart + 2], y: axis.rows[rowStart] + 1 },
      { x: axis.cols[colStart + 2], y: axis.rows[rowStart] - 1 },
      { x: axis.cols[colStart - 1], y: axis.rows[rowStart] + 2 },
      { x: axis.cols[colStart - 1], y: axis.rows[rowStart] - 2 },
      { x: axis.cols[colStart - 2], y: axis.rows[rowStart] + 1 },
      { x: axis.cols[colStart - 2], y: axis.rows[rowStart] - 1 },
    ];

    nextOptions.forEach((position) => {
      if (!exclude.some((excl) => Object.values(position).includes(excl)))
        nextPositions.push(Object.values(position).join(""));
    });

    return nextPositions;
  };

  const FindPath = (current, end) => {
    let children = NextPos(current.position);

    visited.push(queue.shift());

    children.forEach((child) => {
      child = Node(child);
      child.previous = current;

      if (!visited.some((pos) => pos.position === child.position))
        queue.push(child);
    });

    return current.position === end ? current : FindPath(queue[0], end);
  };

  const Node = (square) => {
    return {
      position: square,
      previous: null,
    };
  };

  queue.push(Node(start));

  let path = FindPath(queue[0], end);
  let pathArray = [path.position];

  while (path.previous !== null) {
    pathArray.unshift(path.previous.position);
    path = path.previous;
  }

  console.log(
    `From ${start} to ${end}, the fastest route is: ${pathArray.join(", ")}`
  );

  return pathArray;
}

export default searchTree;
