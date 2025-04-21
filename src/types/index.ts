
export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  currentLocation: LocationCoordinates;
  estimatedDelivery: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: ShipmentItem[];
  history: ShipmentUpdate[];
}

export interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export interface ShipmentUpdate {
  id: string;
  timestamp: string;
  status: ShipmentStatus;
  location: string;
  coordinates: LocationCoordinates;
  description: string;
}
