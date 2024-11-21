import React from 'react';

const Homepage = () => {
  return (
    
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center text-3xl font-bold text-blue-600 mb-6">
        Welcome to Court Automation
      </header>
      
      <nav className="flex justify-center space-x-4 mb-6">
        <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</a>
        <a href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Signup</a>
        <a href="/reservation" className="bg-purple-500 text-white px-4 py-2 rounded">Make a Reservation</a>
      </nav>
      
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Courts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mock data for now */}
          {[
            { id: 1, name: "Court A", section: "Indoor" },
            { id: 2, name: "Court B", section: "Outdoor" },
          ].map((court) => (
            <div key={court.id} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold">{court.name}</h3>
              <p>Type: {court.section}</p>
              <a
                href={`/reserve/${court.id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                Reserve Now
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
