
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { findShipmentByTrackingNumber } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const TrackingSearch: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "destructive"
      });
      return;
    }

    const shipment = findShipmentByTrackingNumber(trackingNumber);
    
    if (shipment) {
      navigate(`/shipment/${shipment.id}`);
    } else {
      toast({
        title: "Not Found",
        description: `No shipment found with tracking number: ${trackingNumber}`,
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleTrackingSubmit} className="flex space-x-2">
      <Input
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter tracking number..."
        className="flex-1"
      />
      <Button type="submit" className="bg-logistics-primary hover:bg-logistics-primary/90">
        <Search className="w-4 h-4 mr-2" /> Track
      </Button>
    </form>
  );
};

export default TrackingSearch;
