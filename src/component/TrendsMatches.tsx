'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHomepageMatches } from '../utils/requests/tournamentsRequest';
import { formatTournamentsTime } from '../utils/helpers/tournamentsHelpers';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MatchCard from './matches/MatchCard';

const TrendsMatches = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [expandedTournaments, setExpandedTournaments] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomepageMatches();
        console.log(response);
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
    fetchData();
  }, []);

  const toggleTournament = (tournamentName: string) => {
    setExpandedTournaments((prev) => ({
      ...prev,
      [tournamentName]: !prev[tournamentName],
    }));
  };

  if (tournaments.length === 0) {
    return (
      <div className="w-full py-6 bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-primary-200">
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">Loading matches...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-primary-200">
          <div className="flex justify-between items-center mb-6 p-4 bg-white  rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Matches & Fixtures
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Live scores and upcoming games
                </p>
              </div>
            </div>
            <Link
              to="/en/match-center"
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-sm font-medium"
            >
              View All
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

          <div className="space-y-3">
            {tournaments.map((tournament) => (
              <div
                key={tournament.tournamentName}
                className="bg-gray-50/50 rounded-lg overflow-hidden"
              >
                <div
                  className="flex justify-between items-center p-3 bg-gradient-to-r from-primary-50 to-primary-100 cursor-pointer hover:from-primary-100 hover:to-primary-150 transition"
                  onClick={() => toggleTournament(tournament.tournamentName)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        tournament.tournament?.logo ||
                        tournament.tournamentSeason?.logo
                      }
                      alt={tournament.tournamentName}
                      className="w-6 h-6 rounded-full object-cover border border-white"
                    />
                    <h2 className="text-sm font-semibold text-gray-800">
                      {tournament.tournamentName}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {tournament.matches.length} match
                      {tournament.matches.length !== 1 ? 'es' : ''}
                    </span>
                    {expandedTournaments[tournament.tournamentName] ? (
                      <FaChevronUp className="text-gray-500 text-xs" />
                    ) : (
                      <FaChevronDown className="text-gray-500 text-xs" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedTournaments[tournament.tournamentName] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-2 space-y-2"
                    >
                      {tournament.matches.map((match: any, idx: number) => (
                        <motion.div
                          key={match._id || idx}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03, duration: 0.2 }}
                          className={`flex items-center justify-between bg-white rounded-lg p-2 border ${
                            match.status === 'in_progress'
                              ? 'border-red-200 shadow-sm'
                              : match.status === 'halftime'
                              ? 'border-orange-200 shadow-sm'
                              : 'border-gray-100'
                          } hover:shadow-xs transition`}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsMatches;
