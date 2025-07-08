import React from 'react';
import { motion } from 'framer-motion';
import { BookX } from 'lucide-react';
import BackButton from './backButton';

const CourseNotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon Container */}
      <div className="bg-red-100 text-red-600 rounded-full p-3 sm:p-4 mb-4 sm:mb-6">
        <BookX size={32} className="sm:w-10 sm:h-10" />
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 px-2">
        Course Not Found
      </h2>

      {/* Description */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 px-2 leading-relaxed">
        Sorry, we couldn't find the course you're looking for. It might have been removed, renamed, or doesn't exist yet.
      </p>

      {/* Button Container */}
      <div >
        {/* Back Button */}
        <div >
        <a
          href="/"
          
        >
           <BackButton />
        </a>
         
        </div>

        {/* Home Link */}

      </div>
    </motion.div>
  );
};

export default CourseNotFound;
