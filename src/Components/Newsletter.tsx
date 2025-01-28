const NewsLetter: React.FC = () => {
    return (
        <div className="mt-8 bg-[#3E60F4] text-white p-6 ">
        <h2 className="text-2xl font-bold mb-3">Subscribe to our newsletter</h2>
        <p className="mb-2">Get more from Kickside. You can unsubscribe at any time.</p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="example@kickside.rw"
            className="flex p-3 bg-none text-black"
          />
          <button className="bg-white text-blue-600 font-bold py-3 px-6 ">
            Subscribe
          </button>
        </form>
      </div>
    );
};

export default NewsLetter;