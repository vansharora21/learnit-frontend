import React from 'react';
import { motion } from 'framer-motion';
import { BookX } from 'lucide-react'; // optional, beautiful icon
import BackButton from './backButton';

const CourseNotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-red-100 text-red-600 rounded-full p-4 mb-4">
        <BookX size={40} />
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-2">
        Course Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
        Sorry, we couldn’t find the course you’re looking for. It might have been removed, renamed, or doesn’t exist yet.
      </p>
      <a
        href="/"
        className="inline-block px-8 py-3 rounded-xl text-black font-semibold text-lg bg-gradient-to-r from-fuchsia-500 via-red-500 to-rose-500 hover:from-rose-500 hover:to-fuchsia-500 shadow-xl transition duration-300 transform hover:scale-105"
      >
        <div style={{ maxWidth: '1200px', margin: '10px auto', padding: '0 23rem', background: 'white' }}>
          <BackButton />
        </div>
      </a>
    </motion.div>
  );
};

export default CourseNotFound;
