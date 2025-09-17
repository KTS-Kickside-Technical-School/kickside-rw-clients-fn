import { useEffect, useState } from 'react';
import { getLatestSeasons } from '../../utils/requests/tournamentsRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaTrophy, FaSearch } from 'react-icons/fa';

interface SeasonsListProps {
  onTournamentSelect?: () => void;
}

const SeasonsList = ({ onTournamentSelect }: SeasonsListProps) => {
  const [tournaments, setTournaments] = useState<any>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getLatestSeasons();

      if (response.status === 200) {
        setTournaments(response.data);
        setFilteredTournaments(response.data);
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

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTournaments(tournaments);
    } else {
      const filtered = tournaments.filter((tournament: any) =>
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTournaments(filtered);
    }
  }, [searchQuery, tournaments]);

  const handleTournamentClick = (slug: string) => {
    navigate(`/en/match-center/fixtures/${encodeURIComponent(slug)}`);

    if (onTournamentSelect) {
      onTournamentSelect();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-400 shadow-sm p-4 lg:min-h-screen lg:w-80">
      <div className="lg:hidden mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <h2 className="font-semibold text-sm mb-3 flex items-center text-gray-800">
        <FaTrophy className="text-yellow-500 mr-2 text-sm" />
        Select a Tournament
      </h2>

      {filteredTournaments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FaTrophy className="mx-auto h-8 w-8 text-gray-300 mb-2" />
          <p className="text-sm">No tournaments found</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:text-blue-800 text-xs mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-1 max-h-96 lg:max-h-none overflow-y-auto">
          {filteredTournaments.map((tournament: any) => {
            const isActive = location.pathname.includes(tournament.slug);
            return (
              <button
                key={tournament._id}
                onClick={() => handleTournamentClick(tournament.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="truncate text-left">{tournament.name}</span>
                <FaChevronRight
                  className={`flex-shrink-0 text-xs ${
                    isActive ? 'text-blue-500' : 'text-gray-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-400">
        <p className="text-xs text-gray-500 text-center">
          Showing {filteredTournaments.length} of {tournaments.length}{' '}
          tournaments
        </p>
      </div>
    </div>
  );
};

export default SeasonsList;
