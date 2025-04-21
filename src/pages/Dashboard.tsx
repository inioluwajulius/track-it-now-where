
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Truck, Package, MapPin } from 'lucide-react';
import ShipmentCard from '@/components/ShipmentCard';
import MapComponent from '@/components/MapComponent';
import TrackingSearch from '@/components/TrackingSearch';
import { mockShipments } from '@/data/mockData';
import { Shipment, ShipmentStatus } from '@/types';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'all'>('all');
  
  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = 
      searchTerm === '' ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const pendingCount = mockShipments.filter(s => s.status === 'pending').length;
  const inTransitCount = mockShipments.filter(s => s.status === 'in_transit').length;
  const deliveredCount = mockShipments.filter(s => s.status === 'delivered').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Track-It-Now Logistics</h1>
          <p className="text-muted-foreground mt-1">Monitor and track your shipments in real time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-logistics-primary" />
                Shipment Tracking Map
              </CardTitle>
              <CardDescription>Live view of all active shipments</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MapComponent 
                shipments={mockShipments.filter(s => s.status !== 'delivered' && s.status !== 'cancelled')} 
                height="h-[400px]"
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Quick Track</CardTitle>
              <CardDescription>Find shipment by tracking number</CardDescription>
            </CardHeader>
            <CardContent>
              <TrackingSearch />
              
              <div className="grid grid-cols-1 gap-2 mt-6">
                <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                  <div className="flex items-center">
                    <div className="bg-logistics-primary rounded-full p-1 mr-3">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <span>Total Shipments</span>
                  </div>
                  <span className="font-bold">{mockShipments.length}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-logistics-info rounded-full p-1 mr-3">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <span>Pending</span>
                  </div>
                  <span className="font-bold">{pendingCount}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-logistics-warning rounded-full p-1 mr-3">
                      <Truck className="h-4 w-4 text-black" />
                    </div>
                    <span>In Transit</span>
                  </div>
                  <span className="font-bold">{inTransitCount}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-md">
                  <div className="flex items-center">
                    <div className="bg-logistics-success rounded-full p-1 mr-3">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span>Delivered</span>
                  </div>
                  <span className="font-bold">{deliveredCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">All Shipments</CardTitle>
                <CardDescription>Track and manage your shipments</CardDescription>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-[240px]"
                  prefix={<Search className="h-4 w-4 text-gray-500" />}
                />
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={(val) => setStatusFilter(val as ShipmentStatus | 'all')}>
                  <TabsList className="grid grid-cols-3 md:grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="in_transit">In Transit</TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    <TabsTrigger value="delayed">Delayed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredShipments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShipments.map((shipment) => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">No shipments found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
