import React from 'react';

const StatsSection = () => {
  // Static stats data
  const stats = [
    { value: "1,200+", label: "Events Hosted", icon: "📅" },
    { value: "15,000+", label: "Happy Attendees", icon: "😊" },
    { value: "200+", label: "Active Organizers", icon: "👥" },
    { value: "50+", label: "Cities Covered", icon: "🌎" }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of event organizers and attendees in our growing community
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl mb-3" aria-hidden="true">{stat.icon}</span>
                <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;