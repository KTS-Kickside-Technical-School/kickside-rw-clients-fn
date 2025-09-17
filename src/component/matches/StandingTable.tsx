import React from 'react';
import {
  calculateStandings,
  StandingsTeam,
} from '../../utils/helpers/calculateStandings';
import { FaTrophy } from 'react-icons/fa';

interface Team {
  _id: string;
  name: string;
  logo?: string; // logo URL
  [key: string]: any;
}

interface StandingsTableProps {
  matches: any[];
  allTeams: Team[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({
  matches,
  allTeams,
}) => {
  let standings: StandingsTeam[] = calculateStandings(matches);

  const teamIdToTeam: Record<string, Team> = {};
  allTeams.forEach((t) => {
    teamIdToTeam[t._id] = t;
  });

  const playedTeams = standings.map((t) => t.team);
  const missingTeams = allTeams
    .filter((t) => !playedTeams.includes(t.name))
    .map((t) => ({
      team: t.name,
      logo: t.logo,
      P: 0,
      W: 0,
      D: 0,
      L: 0,
      GF: 0,
      GA: 0,
      GD: 0,
      Pts: 0,
    }));

  standings = [...standings, ...missingTeams];

  standings.sort((a, b) => {
    if (b.Pts !== a.Pts) return b.Pts - a.Pts;
    if (b.GD !== a.GD) return b.GD - a.GD;
    return a.team.localeCompare(b.team);
  });

  if (!standings.length) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
        Standings will appear here once matches are finished
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-400">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <th className="px-6 py-4 text-left font-bold text-sm tracking-wider">
              POS
            </th>
            <th className="px-6 py-4 text-left font-bold text-sm tracking-wider">
              TEAM
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              P
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              W
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              D
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              L
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              GF
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              GA
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              GD
            </th>
            <th className="px-4 py-4 text-center font-bold text-sm tracking-wider">
              PTS
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team: any, idx) => (
            <tr
              key={idx}
              className={`
                    ${idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}
                    ${
                      idx < 1
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400'
                        : ''
                    }
                    hover:bg-blue-50/50 transition-all duration-200
                  `}
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  {idx < 1 && (
                    <FaTrophy
                      className={`text-lg 
                            text-amber-600
                           
                          `}
                    />
                  )}
                  <span
                    className={`font-bold text-lg ${
                      idx < 1 ? 'text-gray-800' : 'text-gray-600'
                    }`}
                  >
                    {idx + 1}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-1 shadow-md">
                    {team.logo ? (
                      <img
                        src={team.logo}
                        alt={team.team}
                        className="w-full h-full object-contain rounded-full bg-white"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">${team.team
                              .substring(0, 2)
                              .toUpperCase()}</div>`;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {team.team.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {team.team}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-center font-medium text-gray-700">
                {team.P}
              </td>
              <td className="px-4 py-4 text-center font-medium text-green-600">
                {team.W}
              </td>
              <td className="px-4 py-4 text-center font-medium text-yellow-600">
                {team.D}
              </td>
              <td className="px-4 py-4 text-center font-medium text-red-600">
                {team.L}
              </td>
              <td className="px-4 py-4 text-center font-medium text-gray-700">
                {team.GF}
              </td>
              <td className="px-4 py-4 text-center font-medium text-gray-700">
                {team.GA}
              </td>
              <td className="px-4 py-4 text-center font-medium text-gray-700">
                <span
                  className={team.GD >= 0 ? 'text-green-600' : 'text-red-600'}
                >
                  {team.GD > 0 ? '+' : ''}
                  {team.GD}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="font-bold text-xl text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {team.Pts}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
