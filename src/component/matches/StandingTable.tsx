import React from 'react';
import {
  calculateStandings,
  StandingsTeam,
} from '../../utils/helpers/calculateStandings';

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
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2">Pos</th>
            <th className="px-3 py-2">Team</th>
            <th className="px-3 py-2">P</th>
            <th className="px-3 py-2">W</th>
            <th className="px-3 py-2">D</th>
            <th className="px-3 py-2">L</th>
            <th className="px-3 py-2">GF</th>
            <th className="px-3 py-2">GA</th>
            <th className="px-3 py-2">GD</th>
            <th className="px-3 py-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team: any, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-3 py-2">{idx + 1}</td>
              <td className="px-3 py-2 font-medium flex items-center gap-2">
                {team.logo && (
                  <img
                    src={team.logo}
                    alt={team.team}
                    className="w-6 h-6 object-contain rounded-full"
                  />
                )}
                {team.team}
              </td>
              <td className="px-3 py-2">{team.P}</td>
              <td className="px-3 py-2">{team.W}</td>
              <td className="px-3 py-2">{team.D}</td>
              <td className="px-3 py-2">{team.L}</td>
              <td className="px-3 py-2">{team.GF}</td>
              <td className="px-3 py-2">{team.GA}</td>
              <td className="px-3 py-2">{team.GD}</td>
              <td className="px-3 py-2">{team.Pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
