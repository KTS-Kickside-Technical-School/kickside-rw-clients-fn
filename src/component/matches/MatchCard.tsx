import { FaClock, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MatchStatusBadge from './MatchStatusBadge';

interface MatchCardProps {
  match: {
    _id: string;
    status: string;
    matchTime: string;
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    homeScore: number;
    awayScore: number;
    slug: string;
  };
  formatTime: (time: string, isScheduled: boolean) => string;
  className: any;
}

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  formatTime,
  className,
}) => {
  const isLive = match.status === 'in_progress';

  return (
    <Link
      to={`/en/match-center/match-details/${encodeURIComponent(match.slug)}`}
      className={`block + ${className}`}
    >
      <div className="bg-gray-100 border border-gray-400 rounded-xl shadow-sm hover:shadow-md transition-all mb-3 p-3">
        {/* Top Row: Time + Status + Star */}
        <div className="flex justify-between items-center mb-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <MatchStatusBadge status={match.status} isMini />
            <div className="flex items-center gap-1 text-gray-500">
              <FaClock size={12} />
              <span className="font-medium">
                {formatTime(match.matchTime, match.status === 'scheduled')}
              </span>
            </div>
          </div>
          <FaRegStar className="text-gray-400 hover:text-yellow-500 cursor-pointer" />
        </div>

        {/* Teams */}
        <div className="flex flex-col gap-3">
          {/* Home team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={match.homeTeam.logo}
                alt=""
                className="w-6 h-6 object-contain"
              />
              <span className="text-sm font-medium text-gray-800 truncate">
                {match.homeTeam.name}
              </span>
            </div>
            <div className="text-base font-bold text-gray-900">
              {match.status === 'finished' || isLive ? match.homeScore : ''}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={match.awayTeam.logo}
                alt=""
                className="w-6 h-6 object-contain"
              />
              <span className="text-sm font-medium text-gray-800 truncate">
                {match.awayTeam.name}
              </span>
            </div>
            <div className="text-base font-bold text-gray-900">
              {match.status === 'finished' || isLive ? match.awayScore : ''}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
