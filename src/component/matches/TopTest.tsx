import React from 'react';
import { FaTrophy, FaTshirt, FaUserAlt } from 'react-icons/fa';

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
  showTeam = true,
  showPosition = true,
  showJerseyNumber = true,
}) => {
  if (!topScorers || topScorers.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
        No top scorers data available
      </div>
    );
  }

  const displayedScorers = topScorers.slice(0, maxItems);

  const getPositionAbbreviation = (position: string) => {
    if (!position) return 'N/A';
    const positions: { [key: string]: string } = {
      Goalkeeper: 'GK',
      Defender: 'DF',
      Midfielder: 'MF',
      Forward: 'FW',
      Striker: 'ST',
      Winger: 'WG',
    };
    return positions[position] || position.substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-white font-bold text-lg">{title}</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player
              </th>
              {showJerseyNumber && (
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
              )}
              {showPosition && (
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pos
                </th>
              )}
              {showTeam && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
              )}
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                MP
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Goals
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg
              </th>
            </tr>
          </thead>
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
                {/* Rank */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center justify-center w-6">
                    {index < 3 ? (
                      <FaTrophy
                        className={`text-lg ${
                          index === 0
                            ? 'text-yellow-500'
                            : index === 1
                            ? 'text-gray-400'
                            : 'text-amber-600'
                        }`}
                      />
                    ) : (
                      <span className="font-medium text-gray-600">
                        {index + 1}
                      </span>
                    )}
                  </div>
                </td>

                {/* Player Info */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {/* Player Avatar */}
                    <div className="flex-shrink-0 relative">
                      {player.playerImage ? (
                        <img
                          src={player.playerImage}
                          alt={player.playerName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = player.jerseyNumber
                                ? `<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-300 shadow-sm">
                                  <span class="text-sm">${player.jerseyNumber}</span>
                                </div>`
                                : `<div class="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white">
                                  <FaUserAlt class="w-5 h-5" />
                                </div>`;
                            }
                          }}
                        />
                      ) : player.jerseyNumber ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-300 shadow-sm">
                          <span className="text-sm">{player.jerseyNumber}</span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white">
                          <FaUserAlt className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                        {player.playerName}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Jersey Number */}
                {showJerseyNumber && (
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    {player.jerseyNumber ? (
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full border border-blue-200">
                        <span className="text-sm font-bold text-blue-700">
                          {player.jerseyNumber}
                        </span>
                      </div>
                    ) : (
                      <FaTshirt className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                )}

                {/* Position */}
                {showPosition && (
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium capitalize">
                      {getPositionAbbreviation(player.position || '')}
                    </span>
                  </td>
                )}

                {/* Team */}
                {showTeam && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {player.team?.logo ? (
                        <img
                          src={player.team.logo}
                          alt={player.team.name}
                          className="w-6 h-6 object-contain"
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
                      <span className="text-sm text-gray-700 font-medium">
                        {player.team?.shortName || player.team?.name || 'N/A'}
                      </span>
                    </div>
                  </td>
                )}

                {/* Matches Played */}
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {player.matchesPlayed}
                  </span>
                </td>

                {/* Goals */}
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <span className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {player.goals}
                  </span>
                </td>

                {/* Goals per Match */}
                <td className="px-4 py-3 text-center whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-700">
                    {player.goalsPerMatch.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
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
