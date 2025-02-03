const NewsLetter: React.FC = () => {
  return (
    <div className="w-full bg-[#3E60F4] py-16 mt-10">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-2xl font-semibold mb-3">
            Subscribe to our Newsletter
          </h2>
          <p className="text-sm mb-6">
            Stay updated with the latest from Kickside. You can unsubscribe
            anytime.
          </p>

          <form className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-1/3 px-6 py-3 bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-all focus:ring-2 focus:ring-blue-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
