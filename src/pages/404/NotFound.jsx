import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-8 text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <div className="text-9xl font-bold text-indigo-600 opacity-20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-indigo-700 animate-bounce">404</div>
            </div>
          </div>

          {/* Ghost Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <div className="absolute w-full h-full bg-gray-200 rounded-full"></div>
              <div className="absolute w-3/4 h-3/4 bg-white rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute flex space-x-2 top-1/3 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse delay-100"></div>
              </div>
              <div className="absolute w-12 h-6 bg-indigo-600 rounded-full bottom-6 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute w-full h-4 bg-gray-300 rounded-full bottom-0 blur-md"></div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Home Button */}
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-gray-500 text-sm">
            Need help? <a href="#" className="text-indigo-600 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;