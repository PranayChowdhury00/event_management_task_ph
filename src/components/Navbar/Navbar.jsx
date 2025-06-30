import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await axios.get('https://event-management-task-ph-backend.onrender.com/check-auth', {
        withCredentials: true // VERY IMPORTANT: sends the session cookie
      });

      if (response.data.authenticated) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Failed to check authentication');
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  

  const handleLogout = async () => {
  try {
    await axios.post('https://event-management-task-ph-backend.onrender.com/logout', {}, { withCredentials: true });
    setUser(null);
    navigate('/');
  } catch (err) {
    console.error('Logout failed:', err);
  }
};


  if (loading) {
    return (
      <div className="navbar bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="navbar bg-white shadow-sm">
        <div className="container mx-auto px-4 text-red-500">
          {error}
        </div>
      </div>
    );
  }

  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/events"
          className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          Events
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/add-event"
          className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          Add Event
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/my-events"
          className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium ${
              isActive 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          My Events
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img className="h-8 w-auto" src="/eventmanagement.png" alt="Event Management" />
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                Event Management
              </span>
            </NavLink>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <ul className="flex space-x-4">{navLinks}</ul>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="ml-4 relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <img className="h-8 w-8 rounded-full" src={user.photoURL} alt={user.name} />
                </button>
                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </NavLink>
            )}
          </div>

          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <ul className="px-2 space-y-1">{navLinks}</ul>
            {!user && (
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
