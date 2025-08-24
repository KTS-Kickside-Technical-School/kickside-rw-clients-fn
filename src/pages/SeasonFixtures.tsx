import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../utils/SEO';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { FaFlag } from 'react-icons/fa';

import { getTournamentMatches } from '../utils/requests/tournamentsRequest';
import { formatTournamentsTime } from '../utils/helpers/tournamentsHelpers';
import SeasonsList from '../component/matches/SeasonsList';
import MatchCard from '../component/matches/MatchCard';
import StandingsTable from '../component/matches/StandingTable';

const SeasonFixtures = () => {
  const { seasonSlug } = useParams();
  const [matches, setMatches] = useState<any>([]);
  const [teams, setTeams] = useState<any>([]);
  const [season, setSeason] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await getTournamentMatches(seasonSlug || '');
      console.log(response);
      if (response?.status === 200) {
        setMatches(response.data.matches || []);
        setSeason(response.data.season || {});
        setTeams(response.data.season.teams);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (seasonSlug) fetchData();

    const interval = setInterval(() => {
      if (seasonSlug) fetchData(false);
    }, 60000);

    return () => clearInterval(interval);
  }, [seasonSlug]);

  const today = new Date().toDateString();
  const fixtures = matches.filter(
    (m: any) => m.status === 'scheduled' || m.status === 'in_progress'
  );
  const results = matches.filter((m: any) => m.status === 'finished');

  const todaysFixtures = fixtures.filter(
    (m: any) => new Date(m.matchTime).toDateString() === today
  );

  const todaysResults = results.filter(
    (m: any) => new Date(m.matchTime).toDateString() === today
  );

  const upcomingFixtures = [...fixtures].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  const pastResults = [...results].sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
  );

  const compName = season?.tournament?.name || season?.name || 'Tournament';
  const country = season?.tournament?.country?.name || '';
  const logo = season?.tournament?.logo || '';
  const founded = season?.tournament?.foundedYear || '';

  return (
    <>
      <SEO
        mainData={{
          title: `${compName} - Kickside`,
          description: `Tournament details`,
        }}
      />
      <Header />

      <main className="max-w-7xl mx-auto p-4 px-6 min-h-screen">
        <div className="flex items-center mb-6 text-sm text-gray-600 space-x-2">
          <Link
            to="/match-center"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Scores
          </Link>
          <span>&gt;</span>
          <span className="font-semibold text-gray-800">{compName}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <SeasonsList />

          <section className="w-full">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-200 rounded-lg h-24"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}{' '}
                <button onClick={() => fetchData} className="ml-2 underline">
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-6">
                  <div className="flex items-center gap-4">
                    {logo ? (
                      <img
                        src={logo}
                        alt="logo"
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border" />
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {compName}
                      </h2>
                      <div className="flex gap-3 text-sm text-gray-600 mt-1">
                        {country && (
                          <span className="flex items-center gap-1">
                            <FaFlag className="text-gray-400" /> {country}
                          </span>
                        )}
                        {founded && <span>Founded {founded}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 border-b mb-4">
                  {[
                    'overview',
                    'fixtures',
                    'results',
                    'standings',
                    'stats',
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2 text-sm font-medium rounded-t-lg transition ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <div>
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-2">
                          Today’s Fixtures
                        </h3>
                        {todaysFixtures.length ? (
                          todaysFixtures.map((m: any) => (
                            <MatchCard
                              match={m}
                              formatTime={formatTournamentsTime}
                            />
                          ))
                        ) : (
                          <div className="text-gray-400 text-sm">
                            No fixtures today
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-2">
                          Today’s Results
                        </h3>
                        {todaysResults.length ? (
                          todaysResults.map((m: any) => (
                            <MatchCard
                              key={m._id}
                              match={m}
                              formatTime={formatTournamentsTime}
                            />
                          ))
                        ) : (
                          <div className="text-gray-400 text-sm">
                            No results today
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-2">
                          Standings
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
                          Standings coming soon
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fixtures */}
                  {activeTab === 'fixtures' && (
                    <div className="space-y-3">
                      {upcomingFixtures.length ? (
                        upcomingFixtures.map((m) => (
                          <MatchCard
                            key={m.id}
                            match={m}
                            formatTime={formatTournamentsTime}
                          />
                        ))
                      ) : (
                        <div className="text-gray-400 text-sm">
                          No upcoming fixtures
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div className="space-y-3">
                      {pastResults.length ? (
                        pastResults.map((m) => (
                          <MatchCard
                            key={m.id}
                            match={m}
                            formatTime={formatTournamentsTime}
                          />
                        ))
                      ) : (
                        <div className="text-gray-400 text-sm">
                          No past results
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'standings' && (
                    <StandingsTable matches={matches} allTeams={teams} />
                  )}

                  {/* Stats */}
                  {activeTab === 'stats' && (
                    <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
                      Tournament stats will be here
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SeasonFixtures;
