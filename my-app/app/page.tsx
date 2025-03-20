"use client";
import React, { useState, useRef, useCallback } from "react";
import Header from "./header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSideBar";
import GardenCanvas from "./GardenCanvas";
import GardenSizeControls from "./GardenSizeControls";
import corn from "./graphics/Corn.svg";
import cabbage from "./graphics/Cabbage.svg";
import blueberry from "./graphics/Blueberry.svg";
import carrot from "./graphics/Carrot.svg";
import garlic from "./graphics/Garlic.svg";

const plants = [
  { 
    name: "Carrot", 
    image: carrot,
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
  {
    name: "Blueberry",
    image: blueberry,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Garlic",
    image: garlic,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

// Create a map of plant names to their image objects for easy lookup
const plantImageMap = {
  "Carrot": carrot,
  "Corn": corn,
  "Cabbage": cabbage,
  "Blueberry": blueberry,
  "Garlic": garlic
};

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
    const newValue = Math.max(5, Number(value) + 1); // Ensure minimum size is 5 feet
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

  // Save garden data to file
  const saveGarden = useCallback(() => {
    // Prepare the garden data
    const gardenData = {
      gardenSize,
      gardenPlants: gardenPlants.map(plant => ({
        name: plant.name,
        x: plant.x,
        y: plant.y,
        id: plant.id,
        // Exclude the image object which can't be serialized
      }))
    };
    
    // Convert to JSON
    const gardenJson = JSON.stringify(gardenData, null, 2);
    
    // Create a Blob with the garden data
    const blob = new Blob([gardenJson], { type: "application/json" });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    // Set a default filename with date
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getTime().toString().padStart(2, '0')}`;
    link.download = `sprout-garden-${dateString}.json`;
    
    // Append to body, click to download, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  }, [gardenSize, gardenPlants]);

  // Load garden data from file
  const loadGarden = useCallback((file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate the data structure
        if (!data.gardenSize || !data.gardenPlants || !Array.isArray(data.gardenPlants)) {
          throw new Error("Invalid garden file format");
        }
        
        // Set the garden size
        setGardenSize(data.gardenSize);
        
        // Process the plants and restore the image objects
        const loadedPlants = data.gardenPlants.map(plant => {
          // Check if the plant name exists in our plant library
          if (!plantImageMap[plant.name]) {
            throw new Error(`Unknown plant type: ${plant.name}`);
          }
          
          // Restore the image object
          return {
            ...plant,
            image: plantImageMap[plant.name],
            description: plants.find(p => p.name === plant.name)?.description || "No description available"
          };
        });
        
        // Set the garden plants
        setGardenPlants(loadedPlants);
        
        // Clear selection
        setSelectedPlant(null);
        
      } catch (error) {
        console.error("Error loading garden:", error);
        
      }
    };
    
    reader.onerror = () => {
      // Show error message
    };
    
    // Read the file as text
    reader.readAsText(file);
  }, []);

  return (
   
      <div className="p-4 bg-green-50 min-h-screen">
        <Header  
          clearGarden={clearGarden}
          saveGarden={saveGarden}
          loadGarden={loadGarden}
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