import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../utils/SEO';
import { getTournamentMatches } from '../utils/requests/tournamentsRequest';
import { formatTournamentsTime } from '../utils/helpers/tournamentsHelpers';
import MatchCard from '../component/matches/MatchCard';
import StandingsTable from '../component/matches/StandingTable';

const SeasonFixtures = () => {
  const { seasonSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<any>([]);
  const [teams, setTeams] = useState<any>([]);
  const [season, setSeason] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getInitialTab = () => {
    const hash = location.hash.replace('#', '');
    const validTabs = ['overview', 'fixtures', 'results', 'standings', 'stats'];
    return validTabs.includes(hash) ? hash : 'overview';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await getTournamentMatches(seasonSlug || '');

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`#${tab}`, { replace: true });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = location.hash.replace('#', '');
      const validTabs = [
        'overview',
        'fixtures',
        'results',
        'standings',
        'stats',
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location.hash]);

  useEffect(() => {
    if (seasonSlug) fetchData();

    const interval = setInterval(() => {
      if (seasonSlug) fetchData(false);
    }, 60000);

    return () => clearInterval(interval);
  }, [seasonSlug]);

  const today = new Date().toDateString();
  const fixtures = matches.filter(
    (m: any) =>
      m.status === 'scheduled' ||
      m.status === 'in_progress' ||
      m.status === 'postponed'
  );
  const results = matches
    .filter((m: any) => m.status === 'finished')
    .sort(
      (a: any, b: any) =>
        new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime()
    );

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
  const flagUrl = season?.tournament?.country?.flagUrl || '';
  const logo = season?.tournament?.logo || '';
  const founded = season?.tournament?.foundedYear || '';

  return (
    <>
      <SEO
        mainData={{
          title: `${compName} Match Results & Fixtures - Kickside News`,
          description: `${compName} Match Results & Fixtures Tournament details. ${country} ${founded}, Watch live from KICKSIDE News`,
        }}
      />

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
          <div className="bg-white border border-gray-400 rounded-2xl p-4 shadow-sm mb-6">
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
                <h2 className="text-xl font-bold text-gray-900">{compName}</h2>
                <div className="flex gap-3 text-sm text-gray-600 mt-1">
                  {country && (
                    <span className="flex items-center gap-1">
                      <img src={flagUrl} alt={country} className="w-4 h-4" />
                      {country}
                    </span>
                  )}
                  {founded && <span>From: {founded}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-b mb-4 overflow-x-auto">
            {['overview', 'fixtures', 'results', 'standings', 'stats'].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-3 text-sm font-medium rounded-t-lg transition whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow border-b-2 border-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>

          <div>
            {activeTab === 'overview' && (
              <>
                <SEO mainData={{ title: `${compName} - Overview` }} />
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Today's Fixtures
                    </h3>
                    {todaysFixtures.length ? (
                      todaysFixtures.map((m: any) => (
                        <MatchCard
                          key={m._id}
                          match={m}
                          formatTime={formatTournamentsTime}
                        />
                      ))
                    ) : (
                      <div className="text-gray-400 text-sm bg-gray-50 rounded-lg p-4 text-center">
                        No fixtures scheduled for today
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Today's Results
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
                      <div className="text-gray-400 text-sm bg-gray-50 rounded-lg p-4 text-center">
                        No results available for today
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'fixtures' && (
              <>
                <SEO
                  mainData={{
                    title: `${compName} - Matches  and Season Results `,
                  }}
                />
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Upcoming Fixtures
                  </h3>
                  {upcomingFixtures.length ? (
                    upcomingFixtures.map((m) => (
                      <MatchCard
                        key={m._id}
                        match={m}
                        formatTime={formatTournamentsTime}
                      />
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm bg-gray-50 rounded-lg p-4 text-center">
                      No upcoming fixtures scheduled
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'results' && (
              <>
                <SEO
                  mainData={{
                    title: `${compName} - Matches  and Season Results `,
                  }}
                />
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Past Results
                  </h3>
                  {pastResults.length ? (
                    pastResults.map((m) => (
                      <MatchCard
                        key={m._id}
                        match={m}
                        formatTime={formatTournamentsTime}
                      />
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm bg-gray-50 rounded-lg p-4 text-center">
                      No past results available
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'standings' && (
              <>
                <SEO
                  mainData={{
                    title: `${compName} - Standings and Season Teams`,
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    League Standings
                  </h3>
                  <StandingsTable matches={matches} allTeams={teams} />
                </div>
              </>
            )}

            {activeTab === 'stats' && (
              <>
                <SEO
                  mainData={{
                    title: `${compName} - Stats  and Season Fixtures `,
                  }}
                />
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="text-gray-400 text-lg mb-2">📊</div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Tournament Statistics
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Detailed statistics and analytics will be available here
                    soon
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SeasonFixtures;
