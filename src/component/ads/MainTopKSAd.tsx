import { motion } from 'framer-motion';

const MainTopKSAd = () => {
  return (
    <motion.a
      href="https://shop.kickside.rw"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="block w-full bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-b border-emerald-100 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-3 overflow-hidden">
        <div className="flex items-center gap-3 flex-1">
          <motion.div
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            <img
              src="/logo.svg"
              alt="Kickside Shop Logo"
              className="w-12 h-12 object-contain drop-shadow-md"
            />
          </motion.div>

          <div className="overflow-hidden flex-1">
            <motion.h2
              className="text-base md:text-lg font-bold text-emerald-700 uppercase tracking-wide"
              animate={{
                scale: [1, 1.02, 1],
                color: ['#065f46', '#059669', '#065f46'],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🚀 FLASH SALE: Limited Time Offer!
            </motion.h2>

            <motion.p
              className="text-xs md:text-sm text-gray-700 font-medium mt-1"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              Exclusive{' '}
              <span className="font-bold text-emerald-600">30% OFF</span> on
              premium jerseys of yout favorite teams.
              <span className="hidden sm:inline"> Fan with style!</span>
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full"
        >
          <span className="text-xs font-bold text-emerald-700">⏰</span>
          <span className="text-xs font-semibold text-emerald-800">
            Ends Soon
          </span>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 5px 20px rgba(5, 150, 105, 0.3)',
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 group-hover:from-emerald-700 group-hover:to-emerald-600 transition-all duration-300"></div>

          <div className="relative flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 md:px-6 py-2 rounded-full text-xs md:text-sm uppercase tracking-wider group-hover:bg-transparent transition-colors duration-300">
            <span>Shop Now</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"
        initial={{ width: '100%' }}
        animate={{ width: ['100%', '0%'] }}
        transition={{ duration: 30, ease: 'linear' }}
      />
    </motion.a>
  );
};

export default MainTopKSAd;
