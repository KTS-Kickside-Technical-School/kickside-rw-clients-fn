import SEO from '../utils/SEO';
import {
  getHomepageMatches,
  getMatches,
} from '../utils/requests/tournamentsRequest';
import { useEffect, useState } from 'react';
import {
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from 'react-icons/fa';
import MatchCard from '../component/matches/MatchCard';
import {
  formatTournamentsTime,
  groupMatchesByTournament,
} from '../utils/helpers/tournamentsHelpers';
import { Link } from 'react-router-dom';

const MatchCenter = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [homepageMatches, setHomepageMatches] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFilters, setUsingFilters] = useState(false);

  const fetchMatches = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError('');
    try {
      const res = await getMatches();
      if (res?.status === 200) {
        setMatches(res.data || []);
      } else {
        throw new Error(res?.message || 'Failed to fetch matches');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const fetchHomepageMatches = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError('');
    try {
      const res = await getHomepageMatches();
      if (res?.status === 200) {
        // Extract and flatten matches from homepage response
        const flattenedMatches = res.data.flatMap((tournamentGroup: any) =>
          tournamentGroup.matches.map((match: any) => ({
            ...match,
            tournament: tournamentGroup.tournament,
            tournamentName: tournamentGroup.tournamentName,
            tournamentSeason: tournamentGroup.tournamentSeason,
          }))
        );
        setHomepageMatches(flattenedMatches || []);
      } else {
        throw new Error(res?.message || 'Failed to fetch homepage data');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepageMatches();
    fetchMatches(false); // Load matches in background but don't use them yet

    const interval = setInterval(() => {
      fetchHomepageMatches(false);
      fetchMatches(false);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Check if user is using filters (date changed from today or status changed from 'all')
  useEffect(() => {
    const isDefaultDate =
      selectedDate.toDateString() === new Date().toDateString();
    const isDefaultStatus = filterStatus === 'all';

    setUsingFilters(!(isDefaultDate && isDefaultStatus));
  }, [selectedDate, filterStatus]);

  const filteredMatches = usingFilters
    ? filterStatus === 'all'
      ? matches
      : matches.filter((m: any) => m.status === filterStatus)
    : homepageMatches;

  const tournamentsGrouped = groupMatchesByTournament(
    filteredMatches,
    selectedDate.toDateString()
  );

  console.log('Grouped', tournamentsGrouped);
  const changeDay = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d);
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
  };

  return (
    <>
      <SEO
        mainData={{
          title:
            'Match Center: Rwandan Livescores, East Africa Live updates on Kickside News',
        }}
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeDay(-1)}
            className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-600"
          >
            <FaChevronLeft size={12} />
          </button>
          <span className="text-sm font-semibold">
            {selectedDate.toDateString() === new Date().toDateString()
              ? 'Today'
              : selectedDate.toDateString()}
          </span>
          <button
            onClick={() => changeDay(1)}
            className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-600"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
        <button
          onClick={() => {}}
          className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-xs font-medium text-gray-700"
        >
          <FaCalendarAlt size={12} /> Pick Date
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {['all', 'in_progress', 'scheduled', 'finished', 'postponed'].map(
          (f) => (
            <button
              key={f}
              onClick={() => handleStatusFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterStatus === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f === 'all'
                ? 'All'
                : f === 'in_progress'
                ? 'Live'
                : f === 'scheduled'
                ? 'Fixtures'
                : f === 'finished'
                ? 'Results'
                : 'Postponed'}
            </button>
          )
        )}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-200 text-xs font-medium text-gray-600"
        >
          <FaFilter size={12} /> Filters
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}{' '}
          <button
            onClick={() => fetchHomepageMatches(false)}
            className="ml-2 underline"
          >
            Retry
          </button>
        </div>
      ) : (
        Object.entries(tournamentsGrouped).map(
          ([tournament, tMatches]: any) => (
            <div key={tournament} className="mb-6">
              <Link
                to={`/en/match-center/fixtures/${tMatches[0].tournamentSeason.slug}`}
                className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-800"
              >
                <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                {tournament}{' '}
                <span className="text-xs text-gray-500">
                  ({tMatches.length})
                </span>
              </Link>
              <div className="space-y-2">
                {tMatches.map((match: any) => (
                  <MatchCard
                    key={match._id}
                    match={match}
                    formatTime={formatTournamentsTime}
                    className={''}
                  />
                ))}
              </div>
            </div>
          )
        )
      )}
    </>
  );
};

export default MatchCenter;
