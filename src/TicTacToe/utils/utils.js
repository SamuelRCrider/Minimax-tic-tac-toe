const aiPlayer = "x";
const huPlayer = "o";

export function getEmptyIndexes(arr) {
  var indexes = [],
    i; // creates empty indexes array
  for (
    i = 0;
    i < arr.length;
    i++ //loops through array
  )
    if (arr[i] === "")
      // finds index of empty spots
      indexes.push(i); // pushes index to new array
  return indexes;
}

export const checkWin = (board, player) => {
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  } else {
    return false;
  }
};

export const getBestMove = (board) => {
  // console.log(minimax(board, "x"), "This is the best move index");

  return minimax(board, "x");
};

const minimax = (board, player) => {
  if (checkWin(board, player) && player === aiPlayer) {
    return 10;
  }
  if (checkWin(board, player) && player === huPlayer) {
    return -10;
  }
  if (board.length === 0) {
    return 0;
  }

  const emptyIndexes = getEmptyIndexes(board);
  let moves = [];
  for (let i = 0; i < emptyIndexes.length; i++) {
    let newBoard = [...board];
    let move = {};
    if (player === huPlayer) {
      newBoard[emptyIndexes[i]] = "o";
      move = { moveIndex: emptyIndexes[i], score: minimax(newBoard, aiPlayer) };
      moves.push(move);
    }
    if (player === aiPlayer) {
      newBoard[emptyIndexes[i]] = "x";
      move = { moveIndex: emptyIndexes[i], score: minimax(newBoard, huPlayer) };
      moves.push(move);
    }
  }
  console.log(moves);
  return moves;
};
