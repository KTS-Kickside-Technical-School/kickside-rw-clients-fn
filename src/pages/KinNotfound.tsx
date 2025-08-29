import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const KinNotfound = () => {
  const redirectTo = '/';

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Oops! Ipaji mushaka ntago yabonetse.
      </h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Iyi paji mushaka ntago yabonetse cyangwa yasibwe. Mwongere mugerageze
        mukanya{' '}
      </p>
      <Link
        to={redirectTo}
        className="flex items-center px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
      >
        <FiHome className="mr-2" />
        Subira ahabanza
      </Link>
    </div>
  );
};

export default KinNotfound;
