'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getFeaturedSeasonInfo,
  getHomepageMatches,
} from '../utils/requests/tournamentsRequest';
import { formatTournamentsTime } from '../utils/helpers/tournamentsHelpers';
import { FaChevronDown, FaChevronUp, FaFire, FaSync } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MatchCard from './matches/MatchCard';
import StandingsTable from './matches/StandingTable';
import TopScorersTable from './matches/TopScorersTable';

const TrendsMatches = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any>();
  const [featuredMatches, setFeaturedMatches] = useState<any[]>([]);
  const [topScorers, setTopScorers] = useState<any[]>([]);
  const [expandedTournaments, setExpandedTournaments] = useState<
    Record<string, boolean>
  >({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFeaturedSeason = async () => {
    try {
      const response = await getFeaturedSeasonInfo();
      if (response.status === 200) {
        setFeatured(response.data.season);
        setFeaturedMatches(response.data.matches);
        setTopScorers(response.data.topScorers || []);
      }
    } catch (error: any) {
      console.error(error.message || 'Error getting the featured season');
    }
  };

  const fetchData = async () => {
    try {
      const response = await getHomepageMatches();
      if (response.status === 200) {
        setTournaments(response.data);
        const allExpanded: Record<string, boolean> = {};
        response.data.forEach((tournament: any) => {
          allExpanded[tournament.tournamentName] = true;
        });
        setExpandedTournaments(allExpanded);
      }
    } catch (error) {
      console.error(error || 'Error fetching matches');
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchData(), fetchFeaturedSeason()]);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    fetchData();
    fetchFeaturedSeason();
  }, []);

  const toggleTournament = (tournamentName: string) => {
    setExpandedTournaments((prev) => ({
      ...prev,
      [tournamentName]: !prev[tournamentName],
    }));
  };

  if (tournaments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-blue-100 shadow-xl">
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading matches...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full py-3">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-blue-100 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <FaFire className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Football Hub
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Live matches, standings, and top performers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-md font-medium disabled:opacity-50"
              >
                <FaSync
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                />
                Refresh
              </button>

              <Link
                to="/en/match-center"
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:shadow-lg font-semibold shadow-md"
              >
                View All Matches
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`lg:col-span-2`}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-blue-100 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
              <FaFire className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
              Live & Upcoming Matches
            </h2>

            <div className="space-y-4">
              {tournaments.map((tournament) => (
                <motion.div
                  key={tournament.tournamentName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl overflow-hidden border border-blue-200"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-blue-100/50 transition-colors"
                    onClick={() => toggleTournament(tournament.tournamentName)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          tournament.tournament?.logo ||
                          tournament.tournamentSeason?.logo
                        }
                        alt={tournament.tournamentName}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          {tournament.tournamentName}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          {tournament.matches.length} match
                          {tournament.matches.length !== 1 ? 'es' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {expandedTournaments[tournament.tournamentName] ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedTournaments[tournament.tournamentName] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 space-y-3 bg-white/50"
                      >
                        {tournament.matches.map((match: any, idx: number) => (
                          <motion.div
                            key={match._id || idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05, duration: 0.2 }}
                          >
                            <MatchCard
                              match={match}
                              className={'w-full'}
                              formatTime={formatTournamentsTime}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="max-h-72 md:max-h-96 overflow-y-auto text-xs md:text-sm">
              <StandingsTable
                matches={featuredMatches}
                allTeams={featured?.teams || []}
                displayedColumns={['POS', 'TEAM', 'PTS']}
                title="Rwanda Premiere league"
                limitTeams={3}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-h-96 overflow-y-auto">
              <TopScorersTable
                topScorers={topScorers}
                title="Top Scorers"
                maxItems={8}
                showTeam={true}
                showPosition={true}
                showJerseyNumber={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrendsMatches;
