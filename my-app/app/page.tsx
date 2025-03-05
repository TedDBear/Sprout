"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

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

  return (
    <div className="p-4 bg-green-50 min-h-screen">
      {/* Header Content */}
    <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-lg rounded-lg">
      <Button variant="outline">Back</Button>
      <h1 className="text-4xl font-extrabold text-green-800 tracking-wide">SPROUT</h1>
      <div className="space-x-2">
        <Button variant="outline">New Garden</Button>
        <Button variant="outline">Save Garden...</Button>
        <Button variant="outline">Load Garden...</Button>
        <Button variant="destructive">Clear Garden</Button>
      </div>
    </div>

      {/* Main Content */}
      <div className="flex gap-4 max-w-6xl mx-auto">
        {/* Left Panel - Plants List */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
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
                onDragStart={handleNewPlantDragStart(plant)}
                className="cursor-pointer hover:bg-green-50 transition-colors"
              >
                <CardContent className="flex items-center space-x-2 p-2">
                  <span className="text-2xl">{plant.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-green-800">{plant.name}</h3>
                    <p className="text-xs text-gray-500">{plant.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel - Garden Area */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          {/* Garden Size Controls */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Height</span>
              <Input
                type="number"
                value={gardenSize.height}
                onChange={(e) => handleSizeChange("height", e.target.value)}
                className="w-20 text-center"
                min="5"
              />
              <span>ft</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Width</span>
              <Input
                type="number"
                value={gardenSize.width}
                onChange={(e) => handleSizeChange("width", e.target.value)}
                className="w-20 text-center"
                min="5"
              />
              <span>ft</span>
            </div>
          </div>

          {/* Garden Canvas */}
          <div
            className="border-2 border-green-200 relative rounded-lg bg-green-50"
            style={{
              width: `${gardenSize.width * 40}px`,
              height: `${gardenSize.height * 40}px`,
              minWidth: "200px", // Minimum canvas size
              minHeight: "200px",
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {gardenPlants.map((plant, index) => (
              <div
                key={index}
                className="absolute text-2xl cursor-move"
                style={{
                  left: `${plant.x}px`,
                  top: `${plant.y}px`,
                }}
                draggable
                onDragStart={handlePlantDragStart(index)}
                onClick={() => handlePlantClick(index)}
              >
                {plant.emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}