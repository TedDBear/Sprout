// In the LeftSidebar.tsx component, add a ref to the image elements
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LeftSidebar({searchQuery, setSearchQuery, filteredPlants, handleNewPlantDragStart}) {
  // Create refs for the plant images
  const imageRefs = useRef({});
  
  return (
    <div className="w-72 h-150 flex-shrink-0 bg-white p-4 rounded-lg shadow-lg overflow-y-scroll">
      <h2 className="text-lg font-semibold mb-4">Plant List</h2>
      <div className="flex items-center mb-4 border p-2 rounded-lg">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search plants..."
          className="ml-2 border-none flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        {filteredPlants.map((plant) => (
          <Card
            key={plant.name}
            draggable
            onDragStart={(e) => {
              // Pass the ref to the drag start handler
              const img = imageRefs.current[plant.name];
              handleNewPlantDragStart(plant, img)(e);
            }}
            className="cursor-pointer hover:bg-green-50 transition-colors"
          >
            <CardContent className="flex items-center space-x-2 p-2">
              <img
                ref={(el) => {
                  // Store ref to the image element
                  if (el) imageRefs.current[plant.name] = el;
                }}
                src={plant.image.src}
                alt={plant.name}
                className="w-15 h-15"
              />
              <div>
                <h3 className="font-semibold text-green-800">{plant.name}</h3>
                <p className="text-xs text-gray-500">{plant.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}