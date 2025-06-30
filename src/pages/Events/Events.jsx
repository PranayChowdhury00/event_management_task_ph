import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // useEffect with inline fetchEvents to avoid dependency warning
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://event-management-task-ph-backend.onrender.com//events/filter", {
          params: {
            title,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
          withCredentials: true,
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };

    fetchEvents();
  }, [title, startDate, endDate]);

  const handleJoin = async (id) => {
    try {
      const res = await axios.post(
        `https://event-management-task-ph-backend.onrender.com//events/${id}/join`,
        {},
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        title: "Joined!",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      // Refetch events after joining
      const updated = await axios.get("https://event-management-task-ph-backend.onrender.com//events/filter", {
        params: {
          title,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
        withCredentials: true,
      });
      setEvents(updated.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Join failed",
      });
    }
  };

  const clearFilters = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div id="events" className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Events</h2>

      {/* Filter UI */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by event title"
          className="border px-4 py-2 rounded w-full sm:w-64"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-4 py-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-4 py-2 rounded"
        />

        <button
          onClick={clearFilters}
          className="px-4 py-2 border rounded hover:text-red-500"
        >
          Clear Filters ✖️
        </button>
      </div>

      {/* Events */}
      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event._id} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>
              <strong>By:</strong> {event.name}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {moment(event.dateTime).format("MMMM D, YYYY [at] h:mm A")}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p className="my-2">{event.description}</p>
            <p>
              <strong>Attendees:</strong> {event.attendeeCount}
            </p>
            <button
              onClick={() => handleJoin(event._id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Join Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
