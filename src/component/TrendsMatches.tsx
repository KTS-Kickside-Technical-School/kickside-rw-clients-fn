'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHomepageMatches } from '../utils/requests/tournamentsRequest';
import { formatTournamentsTime, formatTimeOnly } from '../utils/helpers/tournamentsHelpers';
import {
  FaCircle,
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaVolleyballBall,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress':
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <FaCircle className="text-red-500 text-[10px]" />
          </motion.div>
        );
      case 'scheduled':
        return <FaClock className="text-blue-500 text-xs" />;
      case 'postponed':
        return <FaExclamationTriangle className="text-yellow-500 text-xs" />;
      case 'finished':
        return <FaCheckCircle className="text-green-500 text-xs" />;
      case 'cancelled':
        return <FaTimesCircle className="text-gray-500 text-xs" />;
      case 'halftime':
        return (
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaVolleyballBall className="text-orange-500 text-xs" />
          </motion.div>
        );
      default:
        return <FaCircle className="text-gray-500 text-xs" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'LIVE';
      case 'halftime':
        return 'HT';
      case 'scheduled':
        return ''; // Empty for scheduled matches
      default:
        return status?.replace('_', ' ')?.toUpperCase();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-red-500/10 text-red-600';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-600';
      case 'postponed':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'finished':
        return 'bg-green-500/10 text-green-600';
      case 'cancelled':
        return 'bg-gray-500/10 text-gray-600';
      case 'halftime':
        return 'bg-orange-500/10 text-orange-600';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-primary-700">
              Matches & Fixtures
            </h1>
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
                      src={tournament.tournament.logo}
                      alt={tournament.tournamentName}
                      className="w-6 h-6 rounded-full object-cover border border-white"
                    />
                    <h2 className="text-sm font-semibold text-gray-800">
                      {tournament.tournamentName}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {tournament.matches.length} match{tournament.matches.length !== 1 ? 'es' : ''}
                    </span>
                    {expandedTournaments[tournament.tournamentName] ? (
                      <FaChevronUp className="text-gray-500 text-xs" />
                    ) : (
                      <FaChevronDown className="text-gray-500 text-xs" />
                    )}
                  </div>
                </div>

                {/* Tournament Matches */}
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
                          {/* Time */}
                          <div className="w-12 text-xs text-gray-500 text-center">
                            {match.status === 'scheduled' 
                              ? formatTimeOnly(match.matchTime)
                              : formatTournamentsTime(match.matchTime)
                            }
                          </div>

                          {/* Teams & Scores */}
                          <div className="flex-1 flex flex-col gap-1 ml-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <img
                                  src={match.homeTeam.logo}
                                  alt={match.homeTeam.name}
                                  className="w-5 h-5 rounded-full object-cover border border-gray-200"
                                />
                                <span className="text-xs font-medium truncate max-w-[80px]">
                                  {match.homeTeam.name}
                                </span>
                              </div>
                              <span className="font-bold text-gray-900 text-sm">
                                {match.status !== 'scheduled' &&
                                  match.status !== 'postponed' &&
                                  match.homeScore}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <img
                                  src={match.awayTeam.logo}
                                  alt={match.awayTeam.name}
                                  className="w-5 h-5 rounded-full object-cover border border-gray-200"
                                />
                                <span className="text-xs font-medium truncate max-w-[80px]">
                                  {match.awayTeam.name}
                                </span>
                              </div>
                              <span className="font-bold text-gray-900 text-sm">
                                {match.status !== 'scheduled' &&
                                  match.status !== 'postponed' &&
                                  match.awayScore}
                              </span>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="flex flex-col items-end ml-2">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(match.status)}
                              {getStatusText(match.status) && (
                                <span
                                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(match.status)} ${
                                    match.status === 'in_progress' ||
                                    match.status === 'halftime'
                                      ? 'animate-pulse'
                                      : ''
                                  }`}
                                >
                                  {getStatusText(match.status)}
                                </span>
                              )}
                            </div>
                          </div>
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