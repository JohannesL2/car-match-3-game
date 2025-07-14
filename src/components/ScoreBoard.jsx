const ScoreBoard = ({ score }) => {
  return (
    <div className="w-28 bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold">{score}</h2>
    </div>
  );
};

export default ScoreBoard;
