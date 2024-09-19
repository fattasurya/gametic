import { useState } from 'react'
import { flushSync } from 'react-dom';



function Square({value, onSquareClick}){

  return <button className='Square' onClick={onSquareClick}>{value}</button>;

}


function Board({xIsNext, squares, onPlay}) {

 


  function handleClick(i){

    if (squares[i] || calculateWinner(squares)) 
      return; 


    const nextSquares = squares.slice();
    
   
    nextSquares[i] = (xIsNext) ? 'x' : 'o';
  
    onPlay(nextSquares);
  }


  const winner = calculateWinner(squares);
  let status = '';

  if (winner) {

    status = 'winner:' + winner;
  } else {
    status = 'next player:' + (xIsNext ? 'x' : 'o');
  }

  return (
    <>
    <div className='status'>{status}</div>
    <div className='board'>
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>

    </div>
    </>
  );
}



export default function Game() {
const [xIsNext, setXIsNext] = useState(true);

const [history, setHistory] = useState([Array(9).fill(null)]);

const [currentMove, setCurrentMove] = useState(0);

const currentSquares = history[currentMove];

function jumpTo(nextMove){

  setCurrentMove(nextMove);

  setXIsNext(nextMove % 2 === 0);
}


function handlePlay(nextSquares) {

  const nextHistory =[...history.slice(0, currentMove + 1 ), nextSquares];
  setHistory(nextHistory);

  setCurrentMove(nextHistory.length -1);

  setXIsNext(!xIsNext);

}

const moves = history.map((squares, move) => {

  let description = '';
  if(move > 0) {
    description = 'go to move #' + move;
  } else {

    description = 'go to game start'; 
  }

  return(

    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description} </button>
    </li>

  );

});

  return(
    <div className='game'>
      <div className='gameboard'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}




function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    // Corrected comparison: Check if squares[a], squares[b], and squares[c] are the same
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null; // Return null when there is no winner
}
