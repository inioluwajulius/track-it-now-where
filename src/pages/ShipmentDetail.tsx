
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, Calendar, User, Phone, Mail, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import MapComponent from '@/components/MapComponent';
import { findShipmentById, getStatusColor } from '@/data/mockData';
import { Shipment } from '@/types';

const ShipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundShipment = findShipmentById(id);
      if (foundShipment) {
        setShipment(foundShipment);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">Loading shipment details...</div>
        </div>
      </Layout>
    );
  }

  if (!shipment) {
    return (
      <Layout>
        <div className="flex flex-col h-full items-center justify-center">
          <div className="text-center text-lg mb-4">Shipment not found</div>
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusColorClass = getStatusColor(shipment.status);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold mb-1">Shipment Details</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Tracking Number:</span>
              <span className="font-semibold">{shipment.trackingNumber}</span>
              <Badge className={statusColorClass}>{shipment.status.replace('_', ' ')}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-0 overflow-hidden">
              <div className="p-4 bg-muted/50">
                <h2 className="font-semibold flex items-center">
                  <Map className="h-4 w-4 mr-2" />
                  Shipment Tracking Map
                </h2>
              </div>
              <MapComponent shipment={shipment} height="h-[400px]" />
            </Card>

            <Card className="mt-6 p-6">
              <h2 className="font-semibold text-lg mb-4">Tracking History</h2>
              <div className="space-y-4">
                {shipment.history.map((update, index) => (
                  <div key={update.id} className="relative pl-6 pb-6">
                    {index < shipment.history.length - 1 && (
                      <div className="absolute top-2 left-2 h-full w-0.5 bg-gray-200"></div>
                    )}
                    <div className="absolute top-2 left-0 w-4 h-4 rounded-full bg-primary"></div>
                    <div className="space-y-1">
                      <div className="font-medium">{update.description}</div>
                      <div className="text-sm text-gray-500">{update.location}</div>
                      <div className="text-sm text-gray-500">{formatDate(update.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Package Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Route</h3>
                  <div className="mt-1 flex flex-col">
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 uppercase">From</span>
                      <div className="text-sm font-medium">{shipment.origin}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase">To</span>
                      <div className="text-sm font-medium">{shipment.destination}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Delivery Date</h3>
                  <div className="mt-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{formatDate(shipment.estimatedDelivery)}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Items</h3>
                  <div className="mt-2 space-y-2">
                    {shipment.items.map((item) => (
                      <div key={item.id} className="bg-muted/50 p-3 rounded-md">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          Quantity: {item.quantity} × Weight: {item.weight} kg
                        </div>
                        <div className="text-sm text-gray-500">
                          Dimensions: {item.dimensions.length}×{item.dimensions.width}×{item.dimensions.height} cm
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold text-lg mb-4 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Customer Information
              </h2>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div>{shipment.customer.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Mail className="h-3 w-3 mr-1" /> Email
                  </div>
                  <div className="truncate">{shipment.customer.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Phone className="h-3 w-3 mr-1" /> Phone
                  </div>
                  <div>{shipment.customer.phone}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentDetail;
