import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/event');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    router.push(`/evento/${eventId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Listado de Eventos</h1>
      <div className="event-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card hover:shadow-lg transition-shadow duration-300">
            <div className="event-header">
              <h2 className="event-title">{event.name}</h2>
            </div>
            <div className="event-content">
              <p className="text-sm text-gray-600 mb-2">{new Date(event.start_date).toLocaleString()}</p>
              <p className="mb-4">{event.description.substring(0, 100)}...</p>
              <button className="event-button" onClick={() => handleEventClick(event.id)}>Ver detalles</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
