import { FaCalendar, FaClock } from 'react-icons/fa';
import {
  formatDateOnly,
  formatTimeOnly,
} from '../../../utils/helpers/tournamentsHelpers';
import MatchStatusBadge from '../MatchStatusBadge';

const MatchHeader = ({ match, isLive }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-400 mb-6 overflow-hidden">
      {/* Tournament Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={match.tournamentSeason?.tournament?.logo}
              alt="Tournament Logo"
              className="w-8 h-8 rounded-full object-contain"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {match.tournamentSeason?.name}
              </h3>
              <p className="text-xs text-gray-500">
                Season {match.tournamentSeason?.year?.name}
              </p>
            </div>
          </div>
          <MatchStatusBadge status={match.status} />
        </div>
      </div>

      {/* Match Score */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-col items-center w-2/5">
            <img
              src={match.homeTeam?.logo}
              alt={match.homeTeam?.name}
              className="w-16 h-16 object-contain mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800 text-center">
              {match.homeTeam?.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Home</p>
          </div>

          {/* Score & Time */}
          <div className="flex flex-col items-center w-1/5">
            {isLive ? (
              <>
                <div className="text-3xl font-bold text-gray-800">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="flex items-center gap-1 mt-2 px-3 py-1 bg-red-100 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-red-700">LIVE</span>
                </div>
              </>
            ) : match.status === 'finished' ? (
              <>
                <div className="text-3xl font-bold text-gray-800">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="text-sm text-gray-500 mt-1">FT</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-gray-800">VS</div>
                <div className="flex flex-col items-center mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendar className="w-3 h-3" />
                    <span>{formatDateOnly(match.matchTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <FaClock className="w-3 h-3" />
                    <span>{formatTimeOnly(match.matchTime)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center w-2/5">
            <img
              src={match.awayTeam?.logo}
              alt={match.awayTeam?.name}
              className="w-16 h-16 object-contain mb-3"
            />
            <h3 className="text-lg font-bold text-gray-800 text-center">
              {match.awayTeam?.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Away</p>
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-400">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <span>Referee: {match.referee || 'TBA'}</span>
          <span>•</span>
          <span>Venue: {match.venue || 'TBA'}</span>
          <span>•</span>
          <span>Attendance: {match.attendance || 'TBA'}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
