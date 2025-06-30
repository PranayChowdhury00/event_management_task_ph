import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: "🔍",
      title: "Find Events",
      description: "Browse through hundreds of events in your area"
    },
    {
      icon: "🎟️",
      title: "Join Events",
      description: "RSVP with one click and get reminders"
    },
    {
      icon: "📅",
      title: "Host Events",
      description: "Create your own events and manage attendees"
    }
  ];

  return (
    <section className="py-16 bg-gray-100 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;