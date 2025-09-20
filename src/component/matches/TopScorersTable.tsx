import React from 'react';

interface Player {
  _id: string;
  playerId: string;
  playerName: string;
  playerImage?: string;
  jerseyNumber?: number;
  position?: string;
  team?: {
    _id: string;
    name: string;
    logo?: string;
    shortName?: string;
  };
  goals: number;
  matchesPlayed: number;
  goalsPerMatch: number;
}

interface TopScorersTableProps {
  topScorers: Player[];
  title?: string;
  maxItems?: number;
  showTeam?: boolean;
  showPosition?: boolean;
  showJerseyNumber?: boolean;
}

const TopScorersTable: React.FC<TopScorersTableProps> = ({
  topScorers,
  title = 'Top Scorers',
  maxItems = 10,
}) => {
  if (!topScorers || topScorers.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
        No top scorers data available
      </div>
    );
  }

  const displayedScorers = topScorers.slice(0, maxItems);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-white font-bold text-lg">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-gray-100">
            {displayedScorers.map((player, index) => (
              <tr
                key={player._id || player.playerId}
                className={`hover:bg-blue-50 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } ${
                  index < 3
                    ? 'bg-gradient-to-r from-blue-50/50 to-blue-100/50'
                    : ''
                }`}
              >

                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center justify-center w-6">
                    <span className="font-medium text-gray-600">
                      {index + 1}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 relative">
                      {player.team?.logo ? (
                        <img
                          src={player.team.logo}
                          alt={player.team.name}
                          className="w-6 h-6 object-contain rounded-full border-gray-100 border-2"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">
                            {player.team?.shortName?.substring(0, 2) ||
                              player.team?.name?.substring(0, 2) ||
                              'TM'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                        {player.playerName}
                      </p>
                      <p>{player.team?.name}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <span className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {player.goals}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {topScorers.length > maxItems && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Showing top {maxItems} of {topScorers.length} scorers
          </p>
        </div>
      )}
    </div>
  );
};

export default TopScorersTable;
