
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Shipment, LocationCoordinates } from '@/types';

interface MapComponentProps {
  shipment?: Shipment;
  shipments?: Shipment[];
  height?: string;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  shipment, 
  shipments, 
  height = 'h-[400px]', 
  className = '' 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  // In a real application, you would securely load the API key
  const requestMapboxToken = () => {
    // For demo purposes, we'll use a prompt
    const token = prompt('Please enter your Mapbox access token:');
    if (token) {
      setMapboxToken(token);
      localStorage.setItem('mapbox_token', token);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('mapbox_token');
    if (token) {
      setMapboxToken(token);
    } else {
      requestMapboxToken();
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-98.5795, 39.8283], // Default to center of US
      zoom: 3
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Add markers for shipments
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    const markersElements = document.querySelectorAll('.mapboxgl-marker');
    markersElements.forEach(marker => marker.remove());

    const bounds = new mapboxgl.LngLatBounds();
    let markersAdded = false;

    // Add marker for single shipment
    if (shipment) {
      addMarker(shipment.currentLocation, shipment.status, shipment.trackingNumber);
      bounds.extend([shipment.currentLocation.lng, shipment.currentLocation.lat]);
      
      // Add all history points for path tracking
      if (shipment.history && shipment.history.length > 0) {
        shipment.history.forEach(update => {
          addMarker(update.coordinates, update.status, '', 'small');
          bounds.extend([update.coordinates.lng, update.coordinates.lat]);
        });
        
        // Draw path line between history points if there are multiple points
        if (shipment.history.length > 1) {
          const coordinates = shipment.history.map(update => 
            [update.coordinates.lng, update.coordinates.lat]
          );
          drawPath(coordinates);
        }
      }
      
      markersAdded = true;
    } 
    
    // Add markers for multiple shipments
    if (shipments && shipments.length > 0) {
      shipments.forEach(item => {
        addMarker(item.currentLocation, item.status, item.trackingNumber);
        bounds.extend([item.currentLocation.lng, item.currentLocation.lat]);
      });
      markersAdded = true;
    }

    // Fit map to bounds
    if (markersAdded) {
      map.current.fitBounds(bounds, { 
        padding: 50,
        maxZoom: 10
      });
    }
  }, [mapLoaded, shipment, shipments]);

  // Helper function to add a marker
  const addMarker = (
    coordinates: LocationCoordinates, 
    status: string,
    tooltip: string = '',
    size: 'normal' | 'small' = 'normal'
  ) => {
    if (!map.current) return;

    let color = '#0066cc'; // default blue
    switch (status) {
      case 'delivered': color = '#28a745'; break;
      case 'in_transit': color = '#ffc107'; break;
      case 'pending': color = '#17a2b8'; break;
      case 'delayed': color = '#fd7e14'; break;
      case 'cancelled': color = '#dc3545'; break;
    }

    // Create marker element
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = size === 'normal' ? '20px' : '10px';
    el.style.height = size === 'normal' ? '20px' : '10px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = color;
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
    
    // Add pulse effect for in_transit status
    if (status === 'in_transit' && size === 'normal') {
      el.style.animation = 'pulse 1.5s infinite';
      el.style.boxShadow = `0 0 0 rgba(255, 193, 7, 0.4)`;
      const keyframes = `
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          }
        }
      `;
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
    }

    // Create marker
    new mapboxgl.Marker(el)
      .setLngLat([coordinates.lng, coordinates.lat])
      .setPopup(tooltip ? new mapboxgl.Popup({ offset: 25 }).setText(tooltip) : undefined)
      .addTo(map.current);
  };
  
  // Helper function to draw a path line between coordinates
  const drawPath = (coordinates: number[][]) => {
    if (!map.current || coordinates.length < 2) return;
    
    // Check if the source already exists, remove it if needed
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }
    
    map.current.addSource('route', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates
        }
      }
    });
    
    map.current.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#0066cc',
        'line-width': 3,
        'line-dasharray': [2, 1]
      }
    });
  };
  
  const handleTokenRefresh = () => {
    localStorage.removeItem('mapbox_token');
    requestMapboxToken();
  };

  return (
    <div className={`relative rounded-lg overflow-hidden border shadow-sm ${height} ${className}`}>
      <div ref={mapContainer} className="absolute inset-0" />
      {!mapboxToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <button 
            onClick={requestMapboxToken}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Enter Mapbox Token
          </button>
        </div>
      )}
      {mapboxToken && (
        <button 
          onClick={handleTokenRefresh}
          className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 text-xs text-gray-700 rounded shadow"
        >
          Change Token
        </button>
      )}
    </div>
  );
};

export default MapComponent;
