import React from 'react';

const HeroBanner = () => {
  return (
    <section className="relative h-96 bg-blue-600 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find & Create Amazing Events</h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Discover local events or host your own gathering with our easy-to-use platform
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Browse Events
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition">
            Create Event
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;