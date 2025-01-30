const NewsLetter: React.FC = () => {
  return (
    <div className="w-full bg-[#3E60F4] py-16 pt-5">
      <div className="w-full md:w-[80%] m-auto  text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-2xl font-semibold text-white mb-2">
            Subscribe to our Newsletter
          </h2>
          <p className="text-sm text-white mb-6">
            Stay updated with the latest from Kickside. You can unsubscribe
            anytime.
          </p>

          <form className="flex flex-col sm:flex-row gap-0">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-[300px] bg-transparent sm:w-3/4 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
            />

            <button
              type="submit"
              className="w-full sm:w-1/4 py-4  bg-white text-primary font-semibold transition-all focus:ring-2 focus:ring-blue-500"
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
