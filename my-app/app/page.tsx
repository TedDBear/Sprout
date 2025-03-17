"use client";
import React, { useState, useRef, useCallback } from "react";
import Header from "./header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSideBar";
import GardenCanvas from "./GardenCanvas";
import GardenSizeControls from "./GardenSizeControls";
import tomato from "./graphics/tomato100x100.png"
import corn from "./graphics/corn100x100.png"
import cabbage from "./graphics/cabbage100x100.png"

const plants = [
  { 
    name: "Tomato", 
    image: tomato,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
  },
  { 
    name: "Corn", 
    image: corn,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
  },
  { 
    name: "Cabbage", 
    image: cabbage,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
  },
];
export default function SproutGarden() {
  const [gardenSize, setGardenSize] = useState({ width: 10, height: 10 });
  const [gardenPlants, setGardenPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedPlant, setDraggedPlant] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(-1);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const dragImageRef = useRef(null);
  
  // Handle plant drag start from left panel
  const handleNewPlantDragStart = (plant, imgElement) => (e) => {
  setDraggedPlant(plant);
  e.dataTransfer.setData("text/plain", plant.name);
  
  // Use the existing image element as the drag image
  if (imgElement) {
    // Calculate the center of the image for better positioning
    // 8 and 8 are half the size of the typical drag icon (16x16)
    e.dataTransfer.setDragImage(imgElement, 30, 30);
  }
};


  const handlePlantClick = (index, e) => {
    setSelectedPlant(gardenPlants[index]);
  };

  // Handle existing plant drag start in garden
  const handlePlantDragStart = (index) => (e) => {
    setDraggedIndex(index);
    e.dataTransfer.setData("text/plain", gardenPlants[index].name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    // Adjust position calculation based on typical plant image size (40x40 pixels)
    const plantSize = 40;
    const x = e.clientX - rect.left - (plantSize / 2);
    const y = e.clientY - rect.top - (plantSize / 2);

    // Ensure the plant stays within the garden bounds
    const maxX = gardenSize.width * 40 - plantSize;
    const maxY = gardenSize.height * 40 - plantSize;

    const clampedX = Math.max(0, Math.min(x, maxX));
    const clampedY = Math.max(0, Math.min(y, maxY));

    if (draggedPlant) {
      // Add new plant with unique ID
      const newPlant = { 
        ...draggedPlant, 
        x: clampedX, 
        y: clampedY,
        id: Date.now().toString() // Add unique ID for each plant
      };
      setGardenPlants([...gardenPlants, newPlant]);
      setDraggedPlant(null);
      
      // Optionally select the newly added plant
      setSelectedPlant(newPlant);
    } else if (draggedIndex >= 0) {
      // Move existing plant
      const newPlants = [...gardenPlants];
      newPlants[draggedIndex] = { ...newPlants[draggedIndex], x: clampedX, y: clampedY };
      setGardenPlants(newPlants);
      setDraggedIndex(-1);
      
      // Update selected plant if it was moved
      if (selectedPlant && selectedPlant.id === newPlants[draggedIndex].id) {
        setSelectedPlant(newPlants[draggedIndex]);
      }
    }
  };

  // Handle closing the details panel
  const handleCloseDetails = () => {
    setSelectedPlant(null);
  };
  
  // Handle deleting a plant
  const handleDeletePlant = (plantId) => {
    setGardenPlants(gardenPlants.filter(plant => plant.id !== plantId));
    setSelectedPlant(null);
  };

  // Handle garden size change
  const handleSizeChange = (field, value) => {
    const newValue = Math.max(5, Number(value)); // Ensure minimum size is 5 feet
    setGardenSize((prev) => ({ ...prev, [field]: newValue }));
  };

  // Filter plants based on search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearGarden = useCallback(() => {
    setGardenPlants([]);
    setSelectedPlant(null);
  }, []);
  
  // Close details when clicking on canvas background
  const handleCanvasClick = (e) => {
    // Only handle clicks directly on the canvas, not on plants
    if (e.target === e.currentTarget) {
      setSelectedPlant(null);
    }
  };

  return (
    <div className="p-4 bg-green-50 min-h-screen">
      <Header  
        clearGarden={clearGarden} 
      />
      {/* Main Content */} 
      <div className="flex gap-4 max-w-6xl mx-auto">
        {/* Left Sidebar */}
        <LeftSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredPlants={filteredPlants}
          handleNewPlantDragStart={handleNewPlantDragStart}
        />
        
        {/* Main Garden Area */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          <GardenSizeControls 
            gardenSize={gardenSize}
            handleSizeChange={handleSizeChange}
          />
          <div onClick={handleCanvasClick}>
            <GardenCanvas
              gardenSize={gardenSize}
              handleDrop={handleDrop}
              gardenPlants={gardenPlants}
              handlePlantClick={handlePlantClick}
              handlePlantDragStart={handlePlantDragStart}
            />
          </div>
        </div>
        
        {/* Right Sidebar - Plant Details */}
        <RightSidebar 
          selectedPlant={selectedPlant}
          onClose={handleCloseDetails}
          onDelete={handleDeletePlant}
        />
      </div>
    </div>
  );
}



