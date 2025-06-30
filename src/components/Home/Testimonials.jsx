import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This platform made organizing our conference so much easier!",
      author: "Sarah Johnson",
      role: "Event Organizer"
    },
    {
      quote: "I've discovered amazing local events I wouldn't have found otherwise.",
      author: "Michael Chen",
      role: "Event Attendee"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow">
            <p className="text-xl italic mb-6">"{testimonial.quote}"</p>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;