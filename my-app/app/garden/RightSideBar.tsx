import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function RightSidebar({ 
  selectedPlant, 
  onClose, 
  onDelete 
}) {
  if (!selectedPlant) {
    return (
    <div className="w-72 h-150 flex-shrink-0 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Plant Details</h2>
        <p className="text-gray-500 italic">Select a plant to view details</p>
      </div>
    );
  }

  return (
    <div className="w-72 h-150 flex-shrink-0 bg-white p-4 rounded-lg shadow-lg overflow-y-scroll">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Plant Details</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800">{selectedPlant.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-4">
            <img 
              src={selectedPlant.image.src} 
              alt={selectedPlant.name} 
              className="w-32 h-32 object-contain mb-4"
            />
            
            
            <div className="w-full bg-green-50 p-3 rounded-md mb-4">
              <h3 className="font-medium mb-2">Position</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">X position:</span>
                <span>{Math.floor(selectedPlant.x/40)}ft {Math.floor((selectedPlant.x % 40) / (10/3)) }in.</span>
                <span className="text-gray-500">Y position:</span>
                <span>{Math.floor(selectedPlant.y/40)}ft {Math.floor((selectedPlant.y % 40) / (10/3)) }in.</span>
              </div>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => onDelete(selectedPlant.id)}
            >
              Remove Plant
            </Button>
            <p className="opacity-0">_</p>
            <p>Description:</p>
            <p className="text-sm text-gray-600 mb-4">{selectedPlant.description}</p>
            <p className="opacity-0">_</p>
            <p>Water Requirements:</p>
            <p className="text-sm text-gray-600 mb-4">{selectedPlant.waterAmount}</p>
            <p className="opacity-0">_</p>
            <p>Sunlight Needs:</p>
            <p className="text-sm text-gray-600 mb-4">{selectedPlant.lightLevel}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}