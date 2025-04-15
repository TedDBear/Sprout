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

// Define plant space requirements (in feet)
const plants = [
  { 
    name: "Carrot", 
    image: carrot,
    description: "The carrot is a root vegetable. It is usually orange in color, but some cultivars are purple, black, red, white, and yellow. The most commonly eaten part of the plant is the taproot, but the greens are sometimes eaten as well. The leaves appear first, and the taproot grows more slowly beneath the soil.",
    spaceRequired: 0.5, // 6 inches between plants
    size: { width: 50, height: 50 },
    priceInfo: "Carrot: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  { 
    name: "Corn", 
    image: corn,
    description: "Corn is a large grain plant, or tall grass. Depending on the variety, the corn can be eaten fresh, or dried and ground into cornmeal.",
    spaceRequired: 1.5, // 18 inches between plants
    size: { width: 50, height: 50 },
    priceInfo: "Corn: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  { 
    name: "Cabbage", 
    image: cabbage,
    description: "Cabbage is a member of the Brassica family. It's dense, layered heads grow on stalks and are surrounded by looser outer leaves. It's leaves can be green, white, or purple in color, and smooth or crinkly in texture. Depending on the variety, the head can be round, oblong, or flat.",
    spaceRequired: 1.5, // 18 inches between plants
    size: { width: 50, height: 50 },
    priceInfo: "Cabbage: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Potato", 
    image: Potato,
    description: "Potatoes are starchy root vegetables in the Solanaceae, or Nightshade, family. The leaves and fruit are usually poisonous and the stem tuber is the only edible part once it is cooked. The potato can be cooked in many ways, brewed into alcohol, and also used as the basis for creating bioplastics.",
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    priceInfo: "Potato: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Blueberry",
    image: blueberry,
    description: "Blueberries are perennial flowering plants with sweet, indigo-colored berries. Blueberry plants are usually erect, prostrate shrubs that range in height from 10cm to 4m high, depending on the cultivar.",
    spaceRequired: 3, // 3 feet between plants
    size: { width: 70, height: 70 },
    priceInfo: "Blueberry: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Pumpkin", 
    image: Pumpkin,
    description: "Pumpkins are a squash cultivars that are round to oval in shape with thick, slightly ribbed skin that varies from deep yellow to orange in color. Their flesh ranges from yellow to gold and has large seeds. Like other members of the Cucurbitaceae family, they grow on sprawling vines. Different varieties of pumpkins are grown for food or decoration.",
    spaceRequired: 6,
    size: { width: 50, height: 50 },
    priceInfo: "Potato: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Bell Pepper",
    image: BellPepper,
    description: "Bell peppers are a cultivar group of the species Capsicum annuum. Bell pepper cultivars produce fruits in colors including red, yellow, orange, green, brown, white, and purple. The fruit is often mildly sweet, because this specific cultivar does not produce capsaicin, the chemical responsible for other peppers' spiciness.",
    spaceRequired: 1.5,
    size: {width: 50, height: 50},
    priceInfo: "Bell Pepper: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Broccoli", 
    image: Broccoli,
    description: "Broccoli has large flower heads known as \"crowns\" that are green to blue-green in color, grouped tightly together atop a thick stem, and surrounded by leaves.",
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    priceInfo: "Broccoli: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Green Bean", 
    image: GreenBean,
    description: "Green beans are the unripe, young fruit and protective pods of various cultivars of the common bean.",
    spaceRequired: 1.3,
    size: { width: 50, height: 50 },
    priceInfo: "Green Bean: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Garlic",
    image: garlic,
    description: "The garlic plant has a bulbous root separated into cloves and a tall stalk with branching leaves. The plant has two main subspecies: hard and soft neck. The choice between which subspecies to grow depends on latitude and at what point in the growing season you will be planting the crop. Hard-neck garlic is usually grown in cooler climates and creates larger cloves. Soft-neck garlic is grown in warmer climates and produces smaller, tightly-packed cloves. Be sure to trim garlic scapes before they flower - this will focus the plant's energy into bulb growth, resulting in larger cloves and bulbs. Scapes have a fresh, light garlic flavor. They are delicious raw or cooked, and make a great pesto.",
    spaceRequired: 0.75, // 9 inches between plants
    size: { width: 40, height: 40 },
    priceInfo: "Garlic: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }, 
  {
    name: "Onion",
    image: onion,
    description: "Onions are bulbous vegetables used in a wide range of culinary dishes, prized for their pungency when raw and sweetness when cooked. They come in different colors, including white, yellow, and red.",
    spaceRequired: 0.5,
    size: {width: 40, height: 40},
    priceInfo: "Onion: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Strawberry", 
    image: Strawberry,
    description: "Strawberries are a hybrid species of the genus Fragaria that produce sweet, bright red fruits.",
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    priceInfo: "Strawberry: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Sage", 
    image: Sage,
    description: "Sage is an evergreen shrub with woody stems, soft green-gray leaves, and blue to purplish flowers. It is in the Mint family, it can be used fresh or dried, and it has culinary and medicinal uses.",
    spaceRequired: 1.5,
    size: { width: 50, height: 50 },
    priceInfo: "Sage: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Basil", 
    image: Basil,
    description: "Basil is a fragrant and delicious herb with tender green leaves. Great in just about anything - salad, sauces, meat marinades, pizza, and even popcorn.",
    spaceRequired: 1.3,
    size: { width: 50, height: 50 },
    priceInfo: "Basil: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Rosemary", 
    image: Rosemary,
    description: "Rosemary is a woody, perennial herb with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region. It is a member of the mint family Lamiaceae and has a fibrous root system.",
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    priceInfo: "Rosemary: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Rose", 
    image: Rose,
    description: "Roses are flowering woody perennials in the Rosa genus and Rosaceae family. There are over 100 species, which can take the shape of shrubs or climbing plants with sickle-shaped prickles or thorns. Their flowers, which are also known as roses, are large, showy, and fragrant.",
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    priceInfo: "Rose: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Lily", 
    image: Lily,
    description: "",
    spaceRequired: 1.5,
    size: { width: 50, height: 50 },
    priceInfo: "Rose: Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
];

const plantCompatibility = {
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
          name: "Bell Pepper", 
          message: "Bell Peppers and cabbage compete for nutrients and can stunt each other's growth.",
          minDistance: 10
        },
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
        name: "Cabbage", 
        message: "Bell Peppers and cabbage compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Broccoli", 
        message: "Bell Peppers and Broccoli compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Strawberry", 
        message: "Bell peppers have been known to transmit a fungal disease to strawberries.",
        minDistance: 10
      },
      {
        name: "Broccoli", 
        message: "Bell Peppers and Broccoli compete for nutrients and can stunt each other's growth.",
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
      {
        name: "Onion", 
        message: "The strong scent of onions can stunt the growth of green beans and reduce their yield.",
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
  "Potato": {
    incompatibleWith: [
      {
        name: "Pumpkin", 
        message: "Pumpkins require a lot of water and space, which affect the potato plant significantly.",
        minDistance: 10
      },
      {
        name: "Onion", 
        message: "Onions greatly affect the taste of potatoes.",
        minDistance: 10
      },
      {
        name: "Cabbage", 
        message: "Cabbage and potatoes would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Broccoli", 
        message: "Broccoli and potatoes would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Corn", 
        message: "Corn and potatoes would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Green Bean", 
        message: "Potatoes and green beans would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Strawberry", 
        message: "Potatoes and strawberries would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
    ]
  },
  "Pumpkin": {
    incompatibleWith: [
      {
        name: "Potato", 
        message: "Pumpkins tend to not be friendly with plants with long roots such as potatoes.",
        minDistance: 10
      },
      {
        name: "Onion", 
        message: "Pumpkins tend to not be friendly with plants with long roots such as onions.",
        minDistance: 10
      },
      {
        name: "Broccoli", 
        message: "Broccoli and pumpkins would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Cabbage", 
        message: "Cabbage and pumpkins would compete for nutrients and can stunt each other's growth.",
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
      {
        name: "Broccoli", 
        message: "Broccoli and green beans would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Cabbage", 
        message: "Cabbage and green beans would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: "Potato", 
        message: "Potatos and green beans would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
    ]
  },
  "Strawberry": {
    incompatibleWith: [
      {
        name: "Broccoli", 
        message: "Broccoli and strawberries would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
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
      {
        name: "Potato", 
        message: "Potatoes and strawberries would compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
    ]
  },
  
  
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
};

export default function SproutGarden() {
  const [gardenSize, setGardenSize] = useState({ width: 10, height: 10 });
  const [gardenPlants, setGardenPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedPlant, setDraggedPlant] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(-1);
  const [selectedPlant, setSelectedPlant] = useState(null);
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
    });
  
    return incompatibilityWarnings;
  };

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