
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import TrackingSearch from '@/components/TrackingSearch';
import { Truck } from 'lucide-react';

const Tracking: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center bg-logistics-primary text-white rounded-t-lg">
            <div className="mx-auto mb-2">
              <Truck size={40} />
            </div>
            <CardTitle className="text-2xl">Track Your Shipment</CardTitle>
            <CardDescription className="text-white/90">
              Enter your tracking number to get real-time updates
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-8">
            <TrackingSearch />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="bg-logistics-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-medium mb-1">Quick Tracking</h3>
                <p className="text-sm text-gray-500">Get instant status updates on your package</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="bg-logistics-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="font-medium mb-1">Global Coverage</h3>
                <p className="text-sm text-gray-500">Track shipments anywhere in the world</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="bg-logistics-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-medium mb-1">Detailed Info</h3>
                <p className="text-sm text-gray-500">View complete journey of your shipment</p>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Sample Tracking Numbers</h3>
              <p className="text-sm text-gray-600 mb-2">Try these tracking numbers for demo:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded border text-sm">TN-2023-001 (In Transit)</div>
                <div className="bg-white p-2 rounded border text-sm">TN-2023-002 (Delivered)</div>
                <div className="bg-white p-2 rounded border text-sm">TN-2023-003 (Pending)</div>
                <div className="bg-white p-2 rounded border text-sm">TN-2023-004 (Delayed)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Tracking;
