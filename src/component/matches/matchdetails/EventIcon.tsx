import {
  FaFutbol,
  FaExchangeAlt,
  FaUserInjured,
  FaInfoCircle,
} from 'react-icons/fa';

const EventIcon = ({ eventType }: any) => {
  const iconProps = { className: 'w-4 h-4' };

  switch (eventType) {
    case 'goal':
    case 'own_goal':
    case 'penalty_goal':
      return <FaFutbol {...iconProps} className="text-green-600" />;
    case 'substitution_in':
    case 'substitution_out':
      return <FaExchangeAlt {...iconProps} className="text-blue-600" />;
    case 'yellow_card':
      return <FaFutbol {...iconProps} className="text-yellow-500" />;
    case 'red_card':
    case 'second_yellow_card':
      return <FaFutbol {...iconProps} className="text-red-600" />;
    case 'injury':
      return <FaUserInjured {...iconProps} className="text-orange-500" />;
    default:
      return <FaInfoCircle {...iconProps} className="text-gray-500" />;
  }
};

export default EventIcon;
