import React from 'react';

const FeaturedEvents = () => {
  // Static event data
  const events = [
    {
      id: 1,
      title: "Tech Conference 2023",
      postedBy: "Alex Johnson",
      date: "November 15, 2023 • 9:00 AM",
      location: "San Francisco Convention Center",
      description: "Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing.",
      attendeeCount: 120,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Music Festival",
      postedBy: "Sarah Williams",
      date: "December 5, 2023 • 2:00 PM",
      location: "Central Park, New York",
      description: "Three-day outdoor music festival featuring top artists across multiple genres. Food trucks and art installations included.",
      attendeeCount: 450,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Food Expo",
      postedBy: "Michael Chen",
      date: "November 22, 2023 • 10:00 AM",
      location: "Chicago Expo Center",
      description: "Explore culinary delights from around the world with top chefs and food innovators.",
      attendeeCount: 200,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "Startup Pitch Night",
      postedBy: "Emma Davis",
      date: "December 1, 2023 • 6:30 PM",
      location: "Boston Innovation Hub",
      description: "Local startups pitch their ideas to investors. Networking opportunities available.",
      attendeeCount: 85,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      title: "Yoga in the Park",
      postedBy: "David Wilson",
      date: "November 18, 2023 • 8:00 AM",
      location: "Golden Gate Park, San Francisco",
      description: "Beginner-friendly outdoor yoga session. Mats provided. All levels welcome.",
      attendeeCount: 65,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      title: "Art Gallery Opening",
      postedBy: "Lisa Thompson",
      date: "November 25, 2023 • 7:00 PM",
      location: "Modern Art Museum, Los Angeles",
      description: "Exhibition of contemporary artists with live music and refreshments.",
      attendeeCount: 150,
      image: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Upcoming Featured Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-1">Posted by: {event.postedBy}</p>
              <p className="text-gray-600 mb-1">{event.date}</p>
              <p className="text-gray-600 mb-1">Location: {event.location}</p>
              <p className="text-gray-600 mb-3">{event.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{event.attendeeCount} attendees</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Join Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;