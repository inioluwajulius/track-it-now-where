
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import { mockShipments } from '@/data/mockData';
import { Shipment } from '@/types';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Reports: React.FC = () => {
  // Count shipments by status
  const shipmentStatusCounts = mockShipments.reduce((acc, shipment) => {
    acc[shipment.status] = (acc[shipment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for the pie chart
  const statusData = Object.entries(shipmentStatusCounts).map(([status, count]) => ({
    name: status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1),
    value: count
  }));

  // Colors for the chart
  const COLORS = ['#17a2b8', '#ffc107', '#28a745', '#fd7e14', '#dc3545'];

  // Get shipments due for delivery soon (for demo, assuming the next 2 days)
  const now = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(now.getDate() + 2);

  const upcomingDeliveries = mockShipments.filter(shipment => {
    const deliveryDate = new Date(shipment.estimatedDelivery);
    return deliveryDate >= now && deliveryDate <= twoDaysLater && shipment.status === 'in_transit';
  });

  // Get recently delivered shipments (for demo, assuming within the last 2 days)
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(now.getDate() - 2);

  const recentDeliveries = mockShipments.filter(shipment => {
    if (shipment.status !== 'delivered') return false;
    const lastUpdate = shipment.history[shipment.history.length - 1];
    const deliveredDate = new Date(lastUpdate.timestamp);
    return deliveredDate >= twoDaysAgo && deliveredDate <= now;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Monitor your shipments and track delivery performance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Shipments</CardTitle>
              <CardDescription>All shipments in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockShipments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">In Transit</CardTitle>
              <CardDescription>Currently moving shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-logistics-warning">
                {shipmentStatusCounts['in_transit'] || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Delivered</CardTitle>
              <CardDescription>Successfully completed deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-logistics-success">
                {shipmentStatusCounts['delivered'] || 0}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipment Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="h-5 w-5 mr-2 text-logistics-primary" />
                Upcoming Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeliveries.length > 0 ? (
                <div className="space-y-3">
                  {upcomingDeliveries.map((shipment) => (
                    <ShipmentListItem key={shipment.id} shipment={shipment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No upcoming deliveries in the next 2 days
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recently Delivered</CardTitle>
            <CardDescription>Shipments delivered within the last 2 days</CardDescription>
          </CardHeader>
          <CardContent>
            {recentDeliveries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentDeliveries.map((shipment) => (
                  <ShipmentListItem key={shipment.id} shipment={shipment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent deliveries in the past 2 days
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Helper component for displaying a shipment in a list
const ShipmentListItem: React.FC<{ shipment: Shipment }> = ({ shipment }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
      <div>
        <div className="font-medium">{shipment.trackingNumber}</div>
        <div className="text-sm text-gray-500">{shipment.destination}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">
          {formatDate(shipment.estimatedDelivery)}
        </div>
        <div className="text-xs text-gray-500">{shipment.customer.name}</div>
      </div>
    </div>
  );
};

export default Reports;
