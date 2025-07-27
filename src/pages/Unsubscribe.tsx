import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { unsubscribeFromNewsLetter } from '../utils/requests/newsLetterRequests';
import { isValidEmail } from '../utils/validations/validation';

const Unsubscribe: React.FC = () => {
  const { email, token } = useParams<{ email: string; token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async () => {
    if (!email || !isValidEmail(email)) {
      toast.error('Invalid email. Please try again.');
      return;
    }

    if (!token || token.length < 10) {
      toast.error('Invalid token. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const response = await unsubscribeFromNewsLetter(email, token);
      if (response.status !== 200) {
        toast.error(response.message);
      } else {
        toast.success('You have successfully unsubscribed.');
      }
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Error unsubscribing:', error);
      const errorMessage = 'Failed to unsubscribe. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Unsubscribe from Newsletter
        </h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to unsubscribe from our newsletter? <br />
          You will no longer receive updates at <strong>{email}</strong>.
        </p>
        <button
          onClick={handleUnsubscribe}
          disabled={loading}
          aria-label="Confirm Unsubscribe"
          className={`w-full py-3 rounded-md font-semibold transition-all ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-secondary'
          }`}
        >
          {loading ? 'Unsubscribing...' : 'Unsubscribe'}
        </button>
        <button
          onClick={() => navigate('/')}
          aria-label="Cancel Unsubscription"
          className="mt-4 w-full py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Unsubscribe;
