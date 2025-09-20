import React from 'react';
import {
  calculateStandings,
  StandingsTeam,
} from '../../utils/helpers/calculateStandings';
import { FaTrophy } from 'react-icons/fa';

interface Team {
  _id: string;
  name: string;
  logo?: string;
  [key: string]: any;
}

interface StandingsTableProps {
  matches: any[];
  allTeams: Team[];
  displayedColumns?: string[];
  title?: string;
  limitTeams?: number;
}

const StandingsTable: React.FC<StandingsTableProps> = ({
  matches,
  allTeams,
  displayedColumns = [
    'POS',
    'TEAM',
    'P',
    'W',
    'D',
    'L',
    'GF',
    'GA',
    'GD',
    'PTS',
  ],
  title,
  limitTeams,
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

  const limitedStandings = limitTeams
    ? standings.slice(0, limitTeams)
    : standings;

  if (!standings.length) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
        Standings will appear here once matches are finished
      </div>
    );
  }

  const columns: any = {
    POS: {
      header: 'POS',
      render: (team: any, idx: number) => (
        <div className="flex items-center space-x-2">
          {1 === 1 - 2 && team.name}{' '}
          {idx < 1 && <FaTrophy className="text-md text-amber-600" />}
          <span
            className={`font-bold text-base ${
              idx < 1 ? 'text-gray-800' : 'text-gray-600'
            }`}
          >
            {idx + 1}
          </span>
        </div>
      ),
    },
    TEAM: {
      header: 'TEAM',
      render: (team: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-1 shadow-md">
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
          <span className="font-semibold text-gray-800 text-sm">
            {team.team}
          </span>
        </div>
      ),
    },
    P: {
      header: 'P',
      render: (team: any) => team.P,
      className: 'text-center text-gray-700 text-sm',
    },
    W: {
      header: 'W',
      render: (team: any) => team.W,
      className: 'text-center text-green-600 text-sm',
    },
    D: {
      header: 'D',
      render: (team: any) => team.D,
      className: 'text-center text-yellow-600 text-sm',
    },
    L: {
      header: 'L',
      render: (team: any) => team.L,
      className: 'text-center text-red-600 text-sm',
    },
    GF: {
      header: 'GF',
      render: (team: any) => team.GF,
      className: 'text-center text-gray-700 text-sm',
    },
    GA: {
      header: 'GA',
      render: (team: any) => team.GA,
      className: 'text-center text-gray-700 text-sm',
    },
    GD: {
      header: 'GD',
      render: (team: any) => (
        <span
          className={`text-sm ${
            team.GD >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {team.GD > 0 ? '+' : ''}
          {team.GD}
        </span>
      ),
      className: 'text-center',
    },
    PTS: {
      header: 'PTS',
      render: (team: any) => (
        <span className="font-bold text-base text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {team.Pts}
        </span>
      ),
      className: 'text-center',
    },
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-400">
      {title && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2">
          <h3 className="font-bold text-base">{title}</h3>
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-white ">
            {displayedColumns.map((colKey) => (
              <th
                key={colKey}
                className="px-3 py-2 text-center font-bold text-xs tracking-wider"
              >
                {columns[colKey as keyof typeof columns]?.header || colKey}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {limitedStandings.map((team: any, idx) => (
            <tr
              key={idx}
              className={`
                ${idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}
                ${idx < 1 ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : ''}
                hover:bg-blue-50/50 transition-all duration-200
              `}
            >
              {displayedColumns.map((colKey) => (
                <td
                  key={colKey}
                  className={`px-3 py-2 ${
                    columns[colKey as keyof typeof columns]?.className || ''
                  }`}
                >
                  {columns[colKey as keyof typeof columns]?.render(team, idx)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
