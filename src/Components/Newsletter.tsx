import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscribeToNewsLetter } from '../utils/requests/newsLetterRequests';

const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const response = await subscribeToNewsLetter(email);

      if (response.status !== 201) {
        throw new Error(response.message);
      }

      toast.success('Subscription sent successfully');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to subscribe to newsletter'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#3E60F4] py-16 mt-10">
      <ToastContainer position="top-center" />
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-2xl font-semibold mb-3">
            Subscribe to our Newsletter
          </h2>
          <p className="text-sm mb-6">
            Stay updated with the latest from Kickside. You can unsubscribe
            anytime.
          </p>

          <form
            className="flex flex-col sm:flex-row items-center gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all rounded-md"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-full sm:w-1/3 px-6 py-3 bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-all focus:ring-2 focus:ring-blue-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
