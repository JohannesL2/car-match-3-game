import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import blueCar from "./assets/blue-car.png";
import greenCar from "./assets/green-car.png";
import orangeCar from "./assets/orange-car.png";
import purpleCar from "./assets/purple-car.png";
import redCar from "./assets/red-car.png";
import yellowCar from "./assets/yellow-car.png";
import blank from "./assets/blank.png";

const width = 8;
const CarColors = [blueCar, greenCar, orangeCar, purpleCar, redCar, yellowCar];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const CheckForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const CheckForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const CheckForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const CheckForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * CarColors.length);
        currentColorArrangement[i] = CarColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    if (!gameStarted) setGameStarted(true);

    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");

    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);
    if (validMove) {
      const isAColumnOfFour = CheckForColumnOfFour();
      const isARowOfFour = CheckForRowOfFour();
      const isAColumnOfThree = CheckForColumnOfThree();
      const isARowOfThree = CheckForRowOfThree();

      if (
        squareBeingReplacedId &&
        validMove &&
        (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
      ) {
        setSquareBeingDragged(null);
        setSquareBeingReplaced(null);
      } else {
        currentColorArrangement[squareBeingReplacedId] =
          squareBeingReplaced.getAttribute("src");
        currentColorArrangement[squareBeingDraggedId] =
          squareBeingDragged.getAttribute("src");
        setCurrentColorArrangement([...currentColorArrangement]);
      }
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        CarColors[Math.floor(Math.random() * CarColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    const timer = setInterval(() => {
      CheckForColumnOfFour();
      CheckForRowOfFour();
      CheckForColumnOfThree();
      CheckForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [currentColorArrangement, gameStarted]);

  const scrambleBoard = () => {
    setGameStarted(false);
    createBoard();
  };

  const resetBoard = () => {
    setGameStarted(false);
    createBoard();
    setScoreDisplay(0);
  };

  return (
    <div className="app items-center justify-center flex">
      <div className="game">
        {currentColorArrangement.map((CarColor, index) => (
          <img
            key={index}
            src={CarColor}
            alt={CarColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            className="draggable"
          />
        ))}
      </div>
      <div className="flex flex-col p-4">
        <ScoreBoard score={scoreDisplay} />
        <button
          onClick={scrambleBoard}
          className="w-28 bg-gray-800 text-white p-4 rounded-lg shadow-md hover:bg-gray-500 cursor-pointer"
        >
          Scramble
        </button>

        <button
          onClick={resetBoard}
          className="flex w-28 bg-gray-800 text-white p-4 rounded-lg shadow-md hover:bg-gray-500 cursor-pointer"
        >
          Reset board
        </button>
      </div>
    </div>
  );
};

export default App;
