import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function DetalleEvento() {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchEventDetail = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/event/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch event details');
          }
          const data = await response.json();
          setEvent(data);
        } catch (error) {
          console.error('Error fetching event details:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchEventDetail();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <Layout>
      <div className="event-card max-w-3xl mx-auto">
        <div className="event-header">
          <h2 className="event-title">{event.name}</h2>
        </div>
        <div className="event-content">
          <p className="text-sm text-gray-600 mb-2">
            {new Date(event.start_date).toLocaleString()}
          </p>
          <p className="mb-4">{event.description}</p>
          <p className="mb-2"><strong>Categoría:</strong> {event.event_category.name}</p>
          <p className="mb-2"><strong>Ubicación:</strong> {event.event_location.name}</p>
          <p className="mb-2"><strong>Dirección:</strong> {event.event_location.full_address}</p>
          <p className="mb-2"><strong>Duración:</strong> {event.duration_in_minutes} minutos</p>
          <p className="mb-2"><strong>Precio:</strong> ${event.price}</p>
          <p className="mb-2"><strong>Capacidad máxima:</strong> {event.max_assistance}</p>
          <p className="mb-2"><strong>Creado por:</strong> {event.creator_user.first_name} {event.creator_user.last_name}</p>
          {event.tags && event.tags.length > 0 && (
            <div>
              <strong>Tags:</strong>
              <ul className="list-disc list-inside">
                {event.tags.map((tag) => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
