import EventIcon from './EventIcon';

const EventItem = ({ event, isHomeTeam }: any) => {
  return (
    <div
      className={`flex items-center py-2 ${
        isHomeTeam ? 'justify-start' : 'justify-end'
      }`}
    >
      <div className="flex items-center gap-2 max-w-xs">
        {isHomeTeam && <EventIcon eventType={event.eventType} />}

        <div
          className={`flex flex-col ${
            isHomeTeam ? 'items-start' : 'items-end'
          }`}
        >
          <span className="text-sm font-medium text-gray-800">
            {event.player?.firstname} {event.player?.lastname}
          </span>

          {event.eventType === 'goal' && event.relatedPlayer && (
            <span className="text-xs text-gray-500">
              Assist: {event.relatedPlayer.firstname}{' '}
              {event.relatedPlayer.lastname}
            </span>
          )}
          {event.eventType === 'penalty_goal' && (
            <span className="text-xs text-gray-500">Penalty goal</span>
          )}

          {event.eventType === 'own_goal' && (
            <span className="text-xs text-red-500">Own Goal</span>
          )}
        </div>

        {!isHomeTeam && <EventIcon eventType={event.eventType} />}
      </div>
    </div>
  );
};

export default EventItem;
