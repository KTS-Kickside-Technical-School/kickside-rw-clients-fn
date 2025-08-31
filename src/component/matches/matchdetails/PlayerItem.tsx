const PlayerItem = ({ player, isHomeTeam }: any) => {
  console.log(player.jerseyNumber);
  return (
    <div
      className={`flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 ${
        isHomeTeam ? 'bg-blue-50' : 'bg-red-50'
      }`}
    >
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
        <span className="text-xs font-medium text-gray-600">
          {player?.jerseyNumber !== 0 ? player?.jerseyNumber : '?'}
        </span>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">
          {player.player?.firstname} {player.player?.lastname}
        </div>
        <div className="text-xs text-gray-500">
          {player.position || 'Player'}
        </div>
      </div>
      {player.isCaptain && (
        <div className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center ml-2">
          <span className="text-xs font-bold text-yellow-800">C</span>
        </div>
      )}
    </div>
  );
};

export default PlayerItem;
