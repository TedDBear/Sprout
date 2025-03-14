"use client";
import React, { useState, useRef, useCallback } from "react";
import Header from "./header";
import LeftSidebar from "./LeftSidebar";
import GardenCanvas from "./GardenCanvas";
import GardenSizeControls from "./GardenSizeControls";

const plants = [
  { name: "Tomato", emoji: "🍅", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Potato", emoji: "🥔", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Strawberry", emoji: "🍓", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Lettuce", emoji: "🥬", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Corn", emoji: "🌽", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

export default function SproutGarden() {
  const [gardenSize, setGardenSize] = useState({ width: 10, height: 10 });
  const [gardenPlants, setGardenPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedPlant, setDraggedPlant] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(-1);
  const dragImageRef = useRef(null);

  // Handle plant drag start from left panel
  const handleNewPlantDragStart = (plant) => (e) => {
    setDraggedPlant(plant);
    e.dataTransfer.setData("text/plain", "");

    // Create a hidden element to use as the drag image
    const dragImage = document.createElement("div");
    dragImage.textContent = plant.emoji;
    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px";
    dragImage.style.fontSize = "2rem";
    document.body.appendChild(dragImage);

    // Set the drag image
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    // Clean up the drag image element after the drag operation
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handlePlantClick = (index) => {
    setGardenPlants(gardenPlants.filter((_, i) => i !== index));
  };

  // Handle existing plant drag start in garden
  const handlePlantDragStart = (index) => (e) => {
    setDraggedIndex(index);
    e.dataTransfer.setData("text/plain", "");
  };

  // Handle drop in garden area
  const handleDrop = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 20; // Adjust for emoji size
    const y = e.clientY - rect.top - 20;

    // Ensure the plant stays within the garden bounds
    const maxX = gardenSize.width * 40 - 40; // 40px per foot, minus emoji size
    const maxY = gardenSize.height * 40 - 40;

    const clampedX = Math.max(0, Math.min(x, maxX));
    const clampedY = Math.max(0, Math.min(y, maxY));

    if (draggedPlant) {
      // Add new plant
      setGardenPlants([...gardenPlants, { ...draggedPlant, x: clampedX, y: clampedY }]);
      setDraggedPlant(null);
    } else if (draggedIndex >= 0) {
      // Move existing plant
      const newPlants = [...gardenPlants];
      newPlants[draggedIndex] = { ...newPlants[draggedIndex], x: clampedX, y: clampedY };
      setGardenPlants(newPlants);
      setDraggedIndex(-1);
    }
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

  const clearGarden = useCallback((event) => {
        setGardenPlants([]);
      }, [setGardenPlants]);

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
        {/* Right Panel - Garden Area */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
         <GardenSizeControls 
          gardenSize={gardenSize}
          handleSizeChange={handleSizeChange}
          />
          <GardenCanvas
            gardenSize={gardenSize}
            handleDrop={handleDrop}
            gardenPlants={gardenPlants}
            handlePlantClick={handlePlantClick}
            handlePlantDragStart={handlePlantDragStart}
            />
        </div>
      </div>
    </div>
  );
}