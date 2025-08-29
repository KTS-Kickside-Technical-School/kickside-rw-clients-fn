import { useEffect, useState } from 'react';
import { getLatestSeasons } from '../../utils/requests/tournamentsRequest';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaTrophy } from 'react-icons/fa';

const SeasonsList = () => {
  const [tournaments, setTournaments] = useState<any>([]);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const response = await getLatestSeasons();
      if (response.status === 200) {
        setTournaments(response.data);
        return;
      }
      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 min-h-screen w-[200]">
      <h2 className="font-semibold text-sm mb-3 flex items-center text-gray-800">
        <FaTrophy className="text-yellow-500 mr-2 text-sm" />
        Select a Tournament
      </h2>

      <div className="space-y-1">
        {tournaments.map((tournament: any) => {
          const isActive = location.pathname.includes(tournament.slug);
          return (
            <Link
              key={tournament._id}
              to={`/match-center/fixtures/${encodeURIComponent(
                tournament.slug
              )}`}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="truncate">{tournament.name}</span>
              <FaChevronRight
                className={`flex-shrink-0 text-xs ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonsList;
