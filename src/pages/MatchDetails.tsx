import { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import MainTopKSAd from '../component/ads/MainTopKSAd';
import SEO from '../utils/SEO';
import { getSingleMatch } from '../utils/requests/tournamentsRequest';
import { FaFutbol, FaInfoCircle } from 'react-icons/fa';
import MatchHeader from '../component/matches/matchdetails/MatchHeader';
import PlayerItem from '../component/matches/matchdetails/PlayerItem';
import TabNavigation from '../component/matches/matchdetails/TabNavigation';
import TimelineEvent from '../component/matches/matchdetails/TimelineEvent';

const MatchDetails = () => {
  const { slug } = useParams();
  const [match, setMatch] = useState<any>({});
  const [events, setEvents] = useState<any>([]);
  const [players, setPlayers] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'events', label: 'Events' },
    { id: 'lineups', label: 'Lineups' },
    { id: 'stats', label: 'Statistics' },
  ];

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await getSingleMatch(slug || '');

      if (response?.status === 200) {
        setMatch(response.data.match || {});
        setEvents(response.data.matchActivities || []);
        setPlayers(response.data.players || {});
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const isLive = match.status === 'in_progress';

  useEffect(() => {
    if (slug) fetchData();

    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        if (slug) fetchData(false);
      }, 30000);
    }

    return () => clearInterval(interval);
  }, [slug, isLive]);

  const Mvs = `${match?.homeTeam?.name} vs ${match?.awayTeam?.name}`;

  if (loading) {
    return (
      <>
        <SEO
          mainData={{
            title: 'Loading Match...',
            description: 'Match details loading',
          }}
        />
        <MainTopKSAd />
        <Header />
        <main className="max-w-7xl mx-auto p-4 px-6 min-h-screen">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="flex gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO
          mainData={{
            title: 'Error Loading Match',
            description: 'Error loading match details',
          }}
        />
        <MainTopKSAd />
        <Header />
        <main className="max-w-7xl mx-auto p-4 px-6 min-h-screen">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">
              Error Loading Match
            </div>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchData()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        mainData={{
          title: `${Mvs} - Match Details - Kickside News`,
          description: `${Mvs} match details, scores, events, and lineups. Follow live updates on Kickside News.`,
        }}
      />

      <MatchHeader match={match} isLive={isLive} />

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 'summary' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Match Summary
          </h3>

          <div className="flex justify-center mb-4">
            <div className="w-2/5 text-center font-medium text-gray-700"></div>
            <div className="w-1/5 text-center font-medium text-gray-700"></div>
            <div className="w-2/5 text-center font-medium text-gray-700"></div>
          </div>

          <div className="space-y-1">
            {events
              .filter(
                (e: any) =>
                  e.eventType === 'goal' ||
                  e.eventType === 'own_goal' ||
                  e.eventType === 'penalty_goal'
              )
              .sort((a: any, b: any) => parseInt(b.minute) - parseInt(a.minute))
              .map((event: any) => (
                <TimelineEvent
                  key={event._id}
                  event={event}
                  homeTeamId={match.homeTeam?._id}
                />
              ))}

            {events.filter(
              (e: any) => e.eventType === 'goal' || e.eventType === 'own_goal'
            ).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FaFutbol className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No goals yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Match Events
          </h3>

          <div className="space-y-1">
            {events
              .sort((a: any, b: any) => parseInt(b.minute) - parseInt(a.minute))
              .map((event: any) => (
                <TimelineEvent
                  key={event._id}
                  event={event}
                  homeTeamId={match.homeTeam?._id}
                />
              ))}

            {events.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FaInfoCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No events yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'lineups' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Team Lineups
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <img src={match.homeTeam?.logo} alt="" className="w-5 h-5" />
                {match.homeTeam?.name}
              </h4>
              <div className="space-y-2">
                {players.home?.map((player: any) => (
                  <PlayerItem
                    key={player._id}
                    player={player}
                    isHomeTeam={true}
                  />
                ))}
              </div>
            </div>

            {/* Away Team */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <img src={match.awayTeam?.logo} alt="" className="w-5 h-5" />
                {match.awayTeam?.name}
              </h4>
              <div className="space-y-2">
                {players.away?.map((player: any) => (
                  <PlayerItem
                    key={player._id}
                    player={player}
                    isHomeTeam={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Match Statistics
          </h3>
          <div className="text-center py-12 text-gray-500">
            <FaInfoCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p>Statistics will be available after the match</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchDetails;
