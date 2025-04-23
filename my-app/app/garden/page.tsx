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
import onion from "./graphics/Onion.svg";
import BellPepper from "./graphics/Bell Pepper.svg"
import Basil from "./graphics/Basil.svg"
import Broccoli from "./graphics/Broccoli.svg"
import Rose from "./graphics/Rose.svg"
import GreenBean from "./graphics/Green bean.svg"
import Potato from "./graphics/Potato.svg"
import Pumpkin from "./graphics/Pumpkin.svg"
import Rosemary from "./graphics/Rosemary.svg"
import Sage from "./graphics/Sage.svg"
import Strawberry from "./graphics/Strawberry.svg"
import Lily from "./graphics/Lily.svg"
import Tomato from "./graphics/Tomato.svg"
import Watermelon from "./graphics/Watermelon.svg"
import Tulip from "./graphics/Tulip.svg"

// Define plant space requirements (in feet)
const plants = [
    {
        "name": "Tomato",
        "image": Tomato,
        "description": "Fruiting plant, grown as an annual. Comes in vining or bush types. Diverse fruit sizes/colors.",
        "spaceRequired": 2,
        "size": {"width": 50, "height": 50},
        "apiTag": "Tomato",
        "waterAmount": "Medium",
        "lightLevel": "Full sun"
    },
    {
      "name": "Carrot",
      "image": carrot,
      "description": "A root vegetable. It is usually orange in color, but some cultivars are purple, black, red, white, and yellow.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Carrot",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Corn",
      "image": corn,
      "description": "A leafy stalk that produces ears after pollination.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Corn",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Potato",
      "image": Potato,
      "description": "A starchy root vegetable.",
      "spaceRequired": 2,
      "size": {"width": 50, "height": 50},
      "apiTag": "Potato",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Cabbage",
      "image": cabbage,
      "description": "Dense, layered heads grow on stalks and are surrounded by looser outer leaves. Its leaves can be green, white, or purple in color, and smooth or crinkly in texture. Depending on the variety, the head can be round, oblong, or flat.",
      "spaceRequired": 2,
      "size": {"width": 50, "height": 50},
      "apiTag": "Cabbage",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Bell Pepper",
      "image": BellPepper,
      "description": "Sweet pepper variety (no heat) with blocky, thick-walled fruit. Matures from green to various colors. Bushy plant, grown as an annual.",
      "spaceRequired": 1.5,
      "size": {"width": 50, "height": 50},
      "apiTag": "Bell Pepper",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Broccoli",
      "image": Broccoli,
      "description": "Large flower heads known as 'crowns' that are green to blue-green in color, grouped tightly together atop a thick stem, and surrounded by leaves.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Broccoli",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Green bean",
      "image": GreenBean,
      "description": "An upright bush bean with medium-thick green pods.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Green bean",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Garlic",
      "image": garlic,
      "description": "A bulbous root separated into cloves and a tall stalk with branching leaves.",
      "spaceRequired": 0.5,
      "size": {"width": 50, "height": 50},
      "apiTag": "Garlic",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
  },
  {
      "name": "Onion",
      "image": onion,
      "description": "A bulbous vegetable. It comes in different colors, including white, yellow, and red.",
      "spaceRequired": 0.5,
      "size": {"width": 50, "height": 50},
      "apiTag": "Onion",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
  },
  {
      "name": "Pumpkin",
      "image": Pumpkin,
      "description": "Squash cultivars that are round to oval in shape with thick, slightly ribbed skin that varies from deep yellow to orange in color. Their flesh ranges from yellow to gold and has large seeds.",
      "spaceRequired": 2,
      "size": {"width": 50, "height": 50},
      "apiTag": "Pumpkin",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Blueberry",
      "image": blueberry,
      "description": "Deciduous fruiting shrub (perennial). Produces small blue-purple berries. Often has attractive fall foliage.",
      "spaceRequired": 2.5,
      "size": {"width": 50, "height": 50},
      "apiTag": "Blueberry",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Watermelon",
      "image": Watermelon,
      "description": "A species of melon that produces round or oblong fruits with thick skin and sweet, watery flesh.",
      "spaceRequired": 2,
      "size": {"width": 50, "height": 50},
      "apiTag": "Watermelon",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Strawberry",
      "image": Strawberry,
      "description": "A sweet, bright red fruit.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Strawberry",
      "waterAmount": "Medium",
      "lightLevel": "Full sun - Partial shade"
    },
    {
      "name": "Basil",
      "image": Basil,
      "description": "Aromatic culinary herb, typically grown as an annual. Prized for flavorful leaves. Upright, bushy growth.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Basil",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
  },
  {
      "name": "Rosemary",
      "image": Rosemary,
      "description": "A woody, perennial herb with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Rosemary",
      "waterAmount": "Low",
      "lightLevel": "Full sun"
    },
    {
      "name": "Sage",
      "image": Sage,
      "description": "An evergreen shrub with woody stems, soft green-gray leaves, and blue to purplish flowers.",
      "spaceRequired": 1,
      "size": {"width": 50, "height": 50},
      "apiTag": "Sage",
      "waterAmount": "Low",
      "lightLevel": "Full sun - Partial shade"
    },
    {
      "name": "Lily",
      "image": Lily,
      "description": "A large, fragrant, trumpet-shaped white flower with yellow throats and maroon spots. The plant has long, narrow leaves that grow in a whorled pattern.",
      "spaceRequired": 1.5,
      "size": {"width": 50, "height": 50},
      "apiTag": "Lily",
      "waterAmount": "Low",
      "lightLevel": "Full shade"
    },
    {
      "name": "Rose",
      "image": Rose,
      "description": "Large, fragrant, deep red blooms.",
      "spaceRequired": 2,
      "size": {"width": 50, "height": 50},
      "apiTag": "Rose",
      "waterAmount": "Medium",
      "lightLevel": "Full sun"
    },
    {
      "name": "Tulip",
      "image": Tulip,
      "description": "A large, cup-shaped flower that is usually red, orange or yellow in color.",
      "spaceRequired": 1.5,
      "size": {"width": 50, "height": 50},
      "apiTag": "Tulip",
      "waterAmount": "Medium",
      "lightLevel": "Full sun",
    },
  ];

const plantCompatibility = {
  "Tomato": {
    incompatibleWith: [
      {
        name: "Potato",
        message: "Tomatoes and potatoes are both susceptible to blight, which can spread between them.",
        minDistance: 10
      },
      {
        name: "Corn",
        message: "Corn can attract pests that also target tomatoes, leading to increased pest pressure.",
        minDistance: 10
      },
      {
        name: "Cabbage",
        message: "Cabbage and tomatoes can compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      }
    ]    
  },
  "Carrot": {
    incompatibleWith: [

    ]
  },
  "Corn": {
    incompatibleWith: [
      {
        name: "Cabbage", 
        message: "Corn and cabbage compete for nutrients and can stunt each other's growth. Corn's tall structure may also shade the cabbage.",
        minDistance: 10
      },
      {
        name: "Broccoli",
        message: "Corn and Broccoli compete for nutrients, and corn may can block the broccoli from getting enough sunlight.",      
        minDistance: 10
      },
      {
        name: "Tomato",
        message: "Corn can attract pests that also target tomatoes, leading to increased pest pressure.",
        minDistance: 10
      },
    ]
  },
  "Cabbage": {
    incompatibleWith: [
        {
          name: "Strawberry",
          message: "Strawberries can attract pests that are harmful to cabbage.",
          minDistance: 10
        },
        {
          name: "Corn", 
          message: "Cabbage struggles when planted near corn due to nutrient competition and potential shading.",
          minDistance: 10
        },
        {
          name: "Tomato",
          message: "Cabbage and tomatoes can compete for nutrients and scan stunt each other's growth.",
          minDistance: 10
        }
    ]
  },
  "Blueberry": {
    incompatibleWith: [
    {
      name: "Sage",
      message: "Sage is a part of the mint family, which spread quickly and may overtake the blueberries",
      minDistance: 10
    },
    {
      name: "Rosemary",
      message: "Rosemary is a part of the mint family, which spread quickly and may overtake the blueberries",
      minDistance: 10
    },
    ]
  },
  "Garlic": {
    incompatibleWith: [
      {
        name: "Onion", 
        message: "Garlic and Onions compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Green Beans", 
        message: "The strong scent of Garlic can stunt the growth of green beans and reduce their yield.",
        minDistance: 10
      },
    ]
  },
  "Bell Pepper": {
    incompatibleWith: [
      {
        name: "Strawberry", 
        message: "Bell peppers have been known to transmit a fungal disease to strawberries.",
        minDistance: 10
      },
    ]
  },
  "Onion": {
    incompatibleWith: [
      {
        name: "Garlic", 
        message: "Garlic and Onions compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Pumpkin", 
        message: "Pumpkins require a lot of water and space, which affect the onions significantly.",
        minDistance: 10
      },
      {
        name: "Potato", 
        message: "Onions greatly affect the taste of potatoes.",
        minDistance: 10
      },
    ]
  },
  "Sage": {
    incompatibleWith: [
      {
        name: "Blueberry", 
        message: "Blueberries do not grow well with mint-like plants such as sage, as they tend to overtake the blueberries.",
        minDistance: 10
      },
    ]
  },
  "Rosemary": {
    incompatibleWith: [
      {
        name: "Blueberry", 
        message: "Blueberries do not grow well with mint-like plants such as rosemary, as they tend to overtake the blueberries.",
        minDistance: 10
      },
    ]
  },
  "Green Bean": {
    incompatibleWith: [
      {
        name: "Garlic", 
        message: "The strong scent of Garlic can stunt the growth of green beans and reduce their yield.",
        minDistance: 10
      },
      {
        name: "Onion", 
        message: "The strong scent of onions can stunt the growth of green beans and reduce their yield.",
        minDistance: 10
      },
    ]
  },
  "Strawberry": {
    incompatibleWith: [
      {
        name: "Cabbage",
        message: "Strawberries can attract pests that are harmful to cabbage.",
        minDistance: 10
      },
      {
        name: "Bell Peppers", 
        message: "Bell peppers have been known to transmit a fungal disease to strawberries.",
        minDistance: 10
      },
    ]
  },
  "Potato": {
    incompatibleWith: [
      {
        name: "Tomato",
        message: "Tomatoes and potatoes are both susceptible to blight, which can spread between them.",
        minDistance: 10
      }
    ]
  }
  
};

// Create a map of plant names to their image objects for easy lookup
const plantImageMap = {
  "Carrot": carrot,
  "Corn": corn,
  "Cabbage": cabbage,
  "Blueberry": blueberry,
  "Garlic": garlic,
  "Onion": onion,
  "Bell Pepper": BellPepper,
  "Basil": Basil,
  "Broccoli": Broccoli,
  "Rose": Rose,
  "Green Bean": GreenBean,
  "Potato": Potato,
  "Pumpkin": Pumpkin,
  "Rosemary": Rosemary,
  "Sage": Sage,
  "Strawberry": Strawberry,
  "Lily": Lily,
  "Tulip": Tulip,
  "Watermelon": Watermelon,
  "Tomato": Tomato
};

export default function SproutGarden() {
  const [gardenSize, setGardenSize] = useState({ width: 10, height: 10 });
  const [gardenPlants, setGardenPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedPlant, setDraggedPlant] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(-1);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [enableWarnings, setEnableWarnings] = useState(true);
  const dragImageRef = useRef(null);
  
    // Improved collision detection
const checkPlantCollision = (newPlant, excludeId = null) => {
      return gardenPlants.some(existingPlant => {
        // Skip the plant being moved if an ID is provided
        if (excludeId && existingPlant.id === excludeId) {
          return false;
        }
  
        // Calculate the combined space required (in pixels)
        const combinedSpaceRequired = (newPlant.spaceRequired + existingPlant.spaceRequired) * 40;
        
        // Calculate the distance between plant centers
        const distance = Math.sqrt(
          Math.pow(
            (newPlant.x + (newPlant.size?.width || 40) / 2) - 
            (existingPlant.x + (existingPlant.size?.width || 40) / 2), 2
          ) + 
          Math.pow(
            (newPlant.y + (newPlant.size?.height || 40) / 2) - 
            (existingPlant.y + (existingPlant.size?.height || 40) / 2), 2
          )
        );
        
        // Check if the distance is less than the combined space required
        return distance < combinedSpaceRequired;
      });
  };

  const checkPlantCompatibility = (newPlant, existingPlants) => {
    const incompatibilityWarnings = [];
  
    existingPlants.forEach(existingPlant => {
      const newPlantCompatibility = plantCompatibility[newPlant.name];
      if (enableWarnings) {
        if (newPlantCompatibility?.incompatibleWith) {
          // Find the specific incompatibility for this plant pair
          const incompatibilityRule = newPlantCompatibility.incompatibleWith.find(
            rule => rule.name === existingPlant.name
          );
    
          if (incompatibilityRule) {
            // Calculate the distance between plant centers
            const distance = Math.sqrt(
              Math.pow(
                (newPlant.x + (newPlant.size?.width || 40) / 2) - 
                (existingPlant.x + (existingPlant.size?.width || 40) / 2), 2
              ) + 
              Math.pow(
                (newPlant.y + (newPlant.size?.height || 40) / 2) - 
                (existingPlant.y + (existingPlant.size?.height || 40) / 2), 2
              )
            ) / 40; // Convert to feet
    
            // Check if plants are closer than the minimum safe distance
            if (distance <= incompatibilityRule.minDistance) {
              incompatibilityWarnings.push({
                plant1: newPlant.name,
                plant2: existingPlant.name,
                distance: distance.toFixed(1),
                warningMessage: incompatibilityRule.message,
                minDistance: incompatibilityRule.minDistance
              });
            }
          }
        }
      }
    });
  
    return incompatibilityWarnings;
  };

  
  //Toggle warnings as a result of the button press in the header
  const toggleWarnings = () => {
    setEnableWarnings(prev => !prev);
}

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
    // Adjust position calculation based on plant-specific size
    const x = e.clientX - rect.left - (draggedPlant?.size?.width || 40) / 2;
    const y = e.clientY - rect.top - (draggedPlant?.size?.height || 40) / 2;

    // Ensure the plant stays within the garden bounds
    const maxX = gardenSize.width * 40 - (draggedPlant?.size?.width || 40);
    const maxY = gardenSize.height * 40 - (draggedPlant?.size?.height || 40);

    const clampedX = Math.max(0, Math.min(x, maxX));
    const clampedY = Math.max(0, Math.min(y, maxY));

    if (draggedPlant) {
      // Create new plant object with specific details
      const newPlant = { 
        ...draggedPlant, 
        x: clampedX, 
        y: clampedY,
        id: Date.now().toString(), // Add unique ID for each plant
      };

      // Check for collision before adding
      if (!checkPlantCollision(newPlant)) {
        // Then check for plant compatibility
        const compatibilityWarnings = checkPlantCompatibility(newPlant, gardenPlants);
  
        if (compatibilityWarnings.length > 0) {
          // Create a more detailed warning message
          const warningText = compatibilityWarnings.map(warning => 
            `Warning: ${warning.plant1} and ${warning.plant2} are too close (${warning.distance} ft apart). 
  Recommended minimum distance: ${warning.minDistance} ft.
  ${warning.warningMessage}`
          ).join('\n\n');
  
          // Optional: You could replace this with a more user-friendly notification system
          const userConfirmed = window.confirm(warningText + "\n\nDo you want to place the plant anyway?");
  
          if (!userConfirmed) {
            setDraggedPlant(null);
            return; // Stop placement if user cancels
          }
        }
  
        // If no collision and user confirms (or no warnings), add the plant
        setGardenPlants([...gardenPlants, newPlant]);
        setDraggedPlant(null);
        setSelectedPlant(newPlant);
      } else {
        alert("Cannot put plant here. Too close to other plants!\n");
        setDraggedPlant(null);
      }
    } else if (draggedIndex >= 0) {
      // Move existing plant
      const newPlants = [...gardenPlants];
      const movedPlant = {
        ...newPlants[draggedIndex], 
        x: clampedX, 
        y: clampedY
      };
    
      // Check for collision with other plants when moving
      // Pass the ID of the plant being moved to exclude it from collision check
      const wouldCollide = checkPlantCollision(
        movedPlant, 
        newPlants[draggedIndex].id
      );
    
      // Check for plant compatibility with other plants
      const compatibilityWarnings = checkPlantCompatibility(
        movedPlant, 
        newPlants.filter(plant => plant.id !== newPlants[draggedIndex].id)
      );
    
      if (!wouldCollide && compatibilityWarnings.length === 0) {
        // No collisions and no compatibility issues
        newPlants[draggedIndex] = movedPlant;
        setGardenPlants(newPlants);
        setDraggedIndex(-1);
        
        // Update selected plant if it was moved
        if (selectedPlant && selectedPlant.id === newPlants[draggedIndex].id) {
          setSelectedPlant(newPlants[draggedIndex]);
        }
      } else {
        // Prepare warning messages
        let warningMessage = "";
        let userConfirmed = true;
        if (wouldCollide) {
          alert("Cannot move plant here. Too close to other plants!\n");
          userConfirmed = false;
        }
        
        else if (compatibilityWarnings.length > 0) {
          const compatWarningText = compatibilityWarnings.map(warning => 
            `Warning: ${warning.plant1} and ${warning.plant2} are too close (${warning.distance} ft apart). 
    Recommended minimum distance: ${warning.minDistance} ft.
    ${warning.warningMessage}`
          ).join('\n\n');
          
          warningMessage = compatWarningText;
          userConfirmed = window.confirm(warningMessage + "\n\nDo you want to move the plant anyway?");
        }
    
        if (userConfirmed) {
          // Force move despite warnings
          newPlants[draggedIndex] = movedPlant;
          setGardenPlants(newPlants);
          setDraggedIndex(-1);
          
          // Update selected plant if it was moved
          if (selectedPlant && selectedPlant.id === newPlants[draggedIndex].id) {
            setSelectedPlant(newPlants[draggedIndex]);
          }
        }
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
    const newValue = Math.min(21, Math.max(5, Number(value) + 1));
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
        
        // Process the plants and fully restore the plant objects
        const loadedPlants = data.gardenPlants.map(plant => {
          // Find the corresponding plant definition from the original plants array
          const plantDefinition = plants.find(p => p.name === plant.name);
          
          if (!plantDefinition) {
            throw new Error(`Unknown plant type: ${plant.name}`);
          }
          
          // Fully restore the plant object with all original properties
          return {
            ...plantDefinition,  // Restore original plant definition
            x: plant.x,           // Restore saved position
            y: plant.y,           // Restore saved position
            id: plant.id || Date.now().toString(), // Ensure unique ID
          };
        });
        
        // Perform collision check on loaded plants
        const nonCollidingPlants = [];
        for (const plant of loadedPlants) {
          // Check if the current plant collides with already placed plants
          const wouldCollide = nonCollidingPlants.some(existingPlant => {
            // Calculate the combined space required (in pixels)
            const combinedSpaceRequired = (plant.spaceRequired + existingPlant.spaceRequired) * 40;
            
            // Calculate the distance between plant centers
            const distance = Math.sqrt(
              Math.pow(
                (plant.x + (plant.size?.width || 40) / 2) - 
                (existingPlant.x + (existingPlant.size?.width || 40) / 2), 2
              ) + 
              Math.pow(
                (plant.y + (plant.size?.height || 40) / 2) - 
                (existingPlant.y + (existingPlant.size?.height || 40) / 2), 2
              )
            );
            
            // Check if the distance is less than the combined space required
            return distance < combinedSpaceRequired;
          });
          
          // If no collision, add the plant
          if (!wouldCollide) {
            nonCollidingPlants.push(plant);
          } else {
            // Optional: Log or handle plants that cannot be placed
            console.warn(`Plant ${plant.name} could not be placed due to spacing constraints`);
          }
        }
        
        // Set the garden plants
        setGardenPlants(nonCollidingPlants);
        
        // Clear selection
        setSelectedPlant(null);
        
      } catch (error) {
        console.error("Error loading garden:", error);
        alert(`Error loading garden: ${error.message}`);
      }
    };
    
    reader.onerror = () => {
      console.error("Error reading garden file");
      alert("Error reading garden file");
    };
    
    // Read the file as text
    reader.readAsText(file);
  }, []);

  return (
   
      <div className="p-4 min-h-screen min-w-screen" style={{backgroundColor: "#B2D4A7"}}>
        <Header  
          clearGarden={clearGarden}
          saveGarden={saveGarden}
          loadGarden={loadGarden}
          toggleWarnings={toggleWarnings}
          enableWarnings={enableWarnings}
        />
        {/* Main Content */} 
        <div className="flex gap-4 max-w-8xl mx-auto">
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
