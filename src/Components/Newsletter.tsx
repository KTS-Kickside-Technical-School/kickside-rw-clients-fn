const NewsLetter: React.FC = () => {
  return (
    <div className="w-full bg-[#3E60F4] py-16">
      <div className="max-w-7xl w-11/12 mx-auto px-6 md:px-12 bg-white rounded-2xl shadow-xl p-8">
        {/* Title Section */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-lg text-center text-gray-600 mb-6">
          Stay updated with the latest from Kickside. You can unsubscribe
          anytime.
        </p>

        {/* Form Section */}
        <form className="flex flex-col sm:flex-row gap-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-3/4 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 transition-all"
          />

          {/* Subscribe Button */}
          <button
            type="submit"
            className="w-full sm:w-1/4 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
