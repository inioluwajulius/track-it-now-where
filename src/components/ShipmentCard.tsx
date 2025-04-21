
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shipment, ShipmentStatus } from '@/types';
import { getStatusColor, getStatusIcon } from '@/data/mockData';

interface ShipmentCardProps {
  shipment: Shipment;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const StatusBadge: React.FC<{ status: ShipmentStatus }> = ({ status }) => {
  const colorClass = getStatusColor(status);
  const statusText = status.replace('_', ' ');
  const icon = getStatusIcon(status);
  
  return (
    <Badge className={`${colorClass} capitalize`}>
      <span className="mr-1">{icon}</span> {statusText}
    </Badge>
  );
};

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  return (
    <Link to={`/shipment/${shipment.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{shipment.trackingNumber}</h3>
          <StatusBadge status={shipment.status} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span className="mr-1">From:</span>
            <span className="font-medium">{shipment.origin}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span className="mr-1">To:</span>
            <span className="font-medium">{shipment.destination}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-1" />
            <span className="mr-1">Estimated:</span>
            <span className="font-medium">{formatDate(shipment.estimatedDelivery)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Package size={14} className="mr-1" />
            <span className="mr-1">Items:</span>
            <span className="font-medium">{shipment.items.length} {shipment.items.length === 1 ? 'package' : 'packages'}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ShipmentCard;
