import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('https://event-management-task-ph-backend.onrender.com/my-events', {
        withCredentials: true
      });
      setEvents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  
  const confirmDelete = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setError('');
      setIsDeleting(true);
      setShowDeleteModal(false);
      
     
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDelete));
      
      await axios.delete(`https://event-management-task-ph-backend.onrender.com/events/${eventToDelete}`, {
        withCredentials: true
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete event');
      // Revert if failed
      await fetchEvents();
    } finally {
      setIsDeleting(false);
    }
  };

 
  const handleEdit = (event) => {
    setEventToEdit(event);
    setShowEditModal(true);
  };

 
  const handleUpdate = async (updatedEvent) => {
  try {
    setError('');
    setIsUpdating(true);
      
    const changes = {};
    Object.keys(updatedEvent).forEach(key => {
      if (updatedEvent[key] !== eventToEdit[key]) {
        changes[key] = updatedEvent[key];
      }
    });

  
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event._id === updatedEvent._id ? { ...event, ...updatedEvent } : event
      )
    );

    await axios.patch(
      `https://event-management-task-ph-backend.onrender.com/events/${updatedEvent._id}`,
      {
        ...changes,
        date: changes.dateTime ? format(parseISO(changes.dateTime), 'yyyy-MM-dd') : undefined,
        time: changes.dateTime ? format(parseISO(changes.dateTime), 'HH:mm') : undefined
      },
      { withCredentials: true }
    );

    
    setShowEditModal(false);
    setEventToEdit(null); 
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to update event');
   
    await fetchEvents();
  } finally {
    setIsUpdating(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <button
            onClick={() => navigate('/add-event')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Add New Event
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't created any events yet.</p>
            <button
              onClick={() => navigate('/add-event')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {event.attendeeCount} attendees
                    </span>
                  </div>

                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Posted by:</span> {event.name}
                  </p>

                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">When:</span>{' '}
                    {format(parseISO(event.dateTime), 'MMM d, yyyy h:mm a')}
                  </p>

                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Where:</span> {event.location}
                  </p>

                  <p className="text-gray-700 mb-4">{event.description}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(event._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this event? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <EditEventModal
            event={eventToEdit}
            onClose={() => setShowEditModal(false)}
            onSave={handleUpdate}
            isUpdating={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

// Edit Event Modal Component
const EditEventModal = ({ event, onClose, onSave, isUpdating }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    name: event.name,
    date: format(parseISO(event.dateTime), 'yyyy-MM-dd'),
    time: format(parseISO(event.dateTime), 'HH:mm'),
    location: event.location,
    description: event.description,
    attendeeCount: event.attendeeCount
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    const updatedEvent = {
      ...event,
      ...formData,
      dateTime: new Date(`${formData.date}T${formData.time}`).toISOString()
    };

    onSave(updatedEvent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Event</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time*</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyEvents;