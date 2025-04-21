
import { Shipment, ShipmentStatus } from '../types';

export const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'TN-2023-001',
    status: 'in_transit',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    currentLocation: { lat: 39.7392, lng: -104.9903 },
    estimatedDelivery: '2023-05-15T14:00:00Z',
    customer: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
    },
    items: [
      {
        id: '101',
        name: 'Electronics Package',
        quantity: 2,
        weight: 5.2,
        dimensions: {
          length: 30,
          width: 20,
          height: 10,
        },
      },
    ],
    history: [
      {
        id: '1001',
        timestamp: '2023-05-10T09:30:00Z',
        status: 'pending',
        location: 'New York, NY',
        coordinates: { lat: 40.7128, lng: -74.006 },
        description: 'Package received at origin facility',
      },
      {
        id: '1002',
        timestamp: '2023-05-11T14:20:00Z',
        status: 'in_transit',
        location: 'Columbus, OH',
        coordinates: { lat: 39.9612, lng: -82.9988 },
        description: 'Package in transit to destination',
      },
      {
        id: '1003',
        timestamp: '2023-05-13T08:45:00Z',
        status: 'in_transit',
        location: 'Denver, CO',
        coordinates: { lat: 39.7392, lng: -104.9903 },
        description: 'Package arrived at regional hub',
      },
    ],
  },
  {
    id: '2',
    trackingNumber: 'TN-2023-002',
    status: 'delivered',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    currentLocation: { lat: 25.7617, lng: -80.1918 },
    estimatedDelivery: '2023-05-12T12:00:00Z',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 987-6543',
    },
    items: [
      {
        id: '201',
        name: 'Fashion Apparel',
        quantity: 5,
        weight: 2.8,
        dimensions: {
          length: 25,
          width: 25,
          height: 15,
        },
      },
    ],
    history: [
      {
        id: '2001',
        timestamp: '2023-05-08T10:15:00Z',
        status: 'pending',
        location: 'Chicago, IL',
        coordinates: { lat: 41.8781, lng: -87.6298 },
        description: 'Package received at origin facility',
      },
      {
        id: '2002',
        timestamp: '2023-05-09T16:40:00Z',
        status: 'in_transit',
        location: 'Nashville, TN',
        coordinates: { lat: 36.1627, lng: -86.7816 },
        description: 'Package in transit to destination',
      },
      {
        id: '2003',
        timestamp: '2023-05-10T13:20:00Z',
        status: 'in_transit',
        location: 'Atlanta, GA',
        coordinates: { lat: 33.749, lng: -84.388 },
        description: 'Package arrived at regional hub',
      },
      {
        id: '2004',
        timestamp: '2023-05-12T09:30:00Z',
        status: 'delivered',
        location: 'Miami, FL',
        coordinates: { lat: 25.7617, lng: -80.1918 },
        description: 'Package delivered to recipient',
      },
    ],
  },
  {
    id: '3',
    trackingNumber: 'TN-2023-003',
    status: 'pending',
    origin: 'Seattle, WA',
    destination: 'Boston, MA',
    currentLocation: { lat: 47.6062, lng: -122.3321 },
    estimatedDelivery: '2023-05-18T16:30:00Z',
    customer: {
      name: 'Mike Williams',
      email: 'mike.w@example.com',
      phone: '+1 (555) 234-5678',
    },
    items: [
      {
        id: '301',
        name: 'Books Package',
        quantity: 10,
        weight: 12.5,
        dimensions: {
          length: 40,
          width: 30,
          height: 20,
        },
      },
    ],
    history: [
      {
        id: '3001',
        timestamp: '2023-05-13T11:00:00Z',
        status: 'pending',
        location: 'Seattle, WA',
        coordinates: { lat: 47.6062, lng: -122.3321 },
        description: 'Package received at origin facility',
      },
    ],
  },
  {
    id: '4',
    trackingNumber: 'TN-2023-004',
    status: 'delayed',
    origin: 'Austin, TX',
    destination: 'Portland, OR',
    currentLocation: { lat: 35.0844, lng: -92.4065 },
    estimatedDelivery: '2023-05-17T10:00:00Z',
    customer: {
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 (555) 345-6789',
    },
    items: [
      {
        id: '401',
        name: 'Fragile Glassware',
        quantity: 3,
        weight: 8.7,
        dimensions: {
          length: 50,
          width: 40,
          height: 30,
        },
      },
    ],
    history: [
      {
        id: '4001',
        timestamp: '2023-05-10T08:20:00Z',
        status: 'pending',
        location: 'Austin, TX',
        coordinates: { lat: 30.2672, lng: -97.7431 },
        description: 'Package received at origin facility',
      },
      {
        id: '4002',
        timestamp: '2023-05-11T12:30:00Z',
        status: 'in_transit',
        location: 'Dallas, TX',
        coordinates: { lat: 32.7767, lng: -96.797 },
        description: 'Package in transit to destination',
      },
      {
        id: '4003',
        timestamp: '2023-05-13T15:10:00Z',
        status: 'delayed',
        location: 'Little Rock, AR',
        coordinates: { lat: 35.0844, lng: -92.4065 },
        description: 'Package delayed due to weather conditions',
      },
    ],
  },
  {
    id: '5',
    trackingNumber: 'TN-2023-005',
    status: 'cancelled',
    origin: 'San Francisco, CA',
    destination: 'Denver, CO',
    currentLocation: { lat: 37.7749, lng: -122.4194 },
    estimatedDelivery: '2023-05-14T11:30:00Z',
    customer: {
      name: 'Alex Brown',
      email: 'alex.b@example.com',
      phone: '+1 (555) 456-7890',
    },
    items: [
      {
        id: '501',
        name: 'Office Supplies',
        quantity: 8,
        weight: 4.3,
        dimensions: {
          length: 35,
          width: 25,
          height: 20,
        },
      },
    ],
    history: [
      {
        id: '5001',
        timestamp: '2023-05-09T09:45:00Z',
        status: 'pending',
        location: 'San Francisco, CA',
        coordinates: { lat: 37.7749, lng: -122.4194 },
        description: 'Package received at origin facility',
      },
      {
        id: '5002',
        timestamp: '2023-05-11T17:30:00Z',
        status: 'cancelled',
        location: 'San Francisco, CA',
        coordinates: { lat: 37.7749, lng: -122.4194 },
        description: 'Shipment cancelled by sender',
      },
    ],
  },
];

export const getStatusColor = (status: ShipmentStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-logistics-info text-white';
    case 'in_transit':
      return 'bg-logistics-warning text-black';
    case 'delivered':
      return 'bg-logistics-success text-white';
    case 'delayed':
      return 'bg-amber-500 text-white';
    case 'cancelled':
      return 'bg-logistics-error text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const getStatusIcon = (status: ShipmentStatus): string => {
  switch (status) {
    case 'pending':
      return '🕒';
    case 'in_transit':
      return '🚚';
    case 'delivered':
      return '✅';
    case 'delayed':
      return '⚠️';
    case 'cancelled':
      return '❌';
    default:
      return '❓';
  }
};

export const findShipmentByTrackingNumber = (trackingNumber: string): Shipment | undefined => {
  return mockShipments.find(shipment => 
    shipment.trackingNumber.toLowerCase() === trackingNumber.toLowerCase()
  );
};

export const findShipmentById = (id: string): Shipment | undefined => {
  return mockShipments.find(shipment => shipment.id === id);
};
