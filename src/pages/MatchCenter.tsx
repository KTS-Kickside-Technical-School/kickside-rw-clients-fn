import SEO from '../utils/SEO';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { getMatches } from '../utils/requests/tournamentsRequest';
import { useEffect, useState } from 'react';
import {
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from 'react-icons/fa';
import SeasonsList from '../component/matches/SeasonsList';
import MatchCard from '../component/matches/MatchCard';
import {
  formatTournamentsTime,
  groupMatchesByTournament,
} from '../utils/helpers/tournamentsHelpers';
import { Link } from 'react-router-dom';
import MainTopKSAd from '../component/ads/MainTopKSAd';

const MatchCenter = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError('');
    try {
      const res = await getMatches();
      if (res?.status === 200) {
        setMatches(res.data || []);
      } else {
        throw new Error(res?.message || 'Failed to fetch data');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData(false);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredMatches =
    filterStatus === 'all'
      ? matches
      : matches.filter((m: any) => m.status === filterStatus);

  const tournamentsGrouped = groupMatchesByTournament(
    filteredMatches,
    selectedDate.toDateString()
  );

  const changeDay = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d);
  };

  return (
    <>
      <SEO
        mainData={{
          title:
            'Match Center: Rwandan Livescores, East Africa Live updates on Kickside News',
        }}
      />
      <MainTopKSAd />

      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:px-6">
        <div className="flex items-center mb-4 text-xs text-gray-600 space-x-2">
          <Link
            to="/match-center"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Scores
          </Link>
          <span>&gt;</span>
          <span className="font-semibold text-gray-800">Match Center</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <SeasonsList />

          <section className="flex-1">
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
                    onClick={() => setFilterStatus(f)}
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
                  onClick={() => fetchData(false)}
                  className="ml-2 underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              Object.entries(tournamentsGrouped).map(
                ([tournament, tMatches]: any) => (
                  <div key={tournament} className="mb-6">
                    <h2 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-800">
                      <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                      {tournament}{' '}
                      <span className="text-xs text-gray-500">
                        ({tMatches.length})
                      </span>
                    </h2>
                    <div className="space-y-2">
                      {tMatches.map((match: any) => (
                        <MatchCard
                          key={match._id}
                          match={match}
                          formatTime={formatTournamentsTime}
                        />
                      ))}
                    </div>
                  </div>
                )
              )
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MatchCenter;
