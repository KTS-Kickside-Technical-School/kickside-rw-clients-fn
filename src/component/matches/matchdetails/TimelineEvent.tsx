import EventItem from './EventItem';

const TimelineEvent = ({ event, homeTeamId }: any) => {
  const isHomeTeam = event.team?._id === homeTeamId;

  return (
    <div className="flex items-center justify-center mb-3">
      {isHomeTeam && (
        <>
          <div className="w-2/5 pr-4">
            <EventItem event={event} isHomeTeam={true} />
          </div>

          <div className="w-1/5 flex justify-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {event.minute}'
              </span>
            </div>
          </div>

          <div className="w-2/5"></div>
        </>
      )}

      {!isHomeTeam && (
        <>
          <div className="w-2/5"></div>

          <div className="w-1/5 flex justify-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {event.minute}'
              </span>
            </div>
          </div>

          <div className="w-2/5 pl-4">
            <EventItem event={event} isHomeTeam={false} />
          </div>
        </>
      )}
    </div>
  );
};

export default TimelineEvent;
