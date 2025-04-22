import React, { useState, useRef } from 'react';

//The closest thing I could find for brown in tailwind is bg-orange-500/75

export default function GardenCanvas({
  gardenSize, 
  handleDrop, 
  gardenPlants, 
  handlePlantClick, 
  handlePlantDragStart
}) {
  // State to track which plant is being dragged
  const [draggedPlantIndex, setDraggedPlantIndex] = useState(null);
  
  // Create a custom drag start handler
  const onPlantDragStart = (index) => (e) => {
    // Get the plant being dragged
    const plant = gardenPlants[index];
    
    // Calculate space circle radius
    const spaceRadius = (plant.spaceRequired || 1) * 40;

    // Set the currently dragged plant index
    setDraggedPlantIndex(index);
    
    // Call the original drag start handler
    handlePlantDragStart(index)(e);
    
    // Create a temporary div to act as our drag image
    const dragImage = document.createElement('div');
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px'; // Position off-screen
    dragImage.style.width = `${spaceRadius * 2}px`;
    dragImage.style.height = `${spaceRadius * 2}px`;
    
    // Create the space circle
    const spaceCircle = document.createElement('div');
    spaceCircle.style.width = '100%';
    spaceCircle.style.height = '100%';
    spaceCircle.style.borderRadius = '50%';
    spaceCircle.style.border = '2px solid rgba(34, 197, 94, 1.0)'; // green-500 with transparency
    spaceCircle.style.position = 'relative';
    
    // Create the plant image in the center
    const plantImg = document.createElement('img');
    plantImg.src = plant.image.src;
    plantImg.alt = plant.name;
    plantImg.style.position = 'absolute';
    plantImg.style.width = `${plant.size?.width || 40}px`;
    plantImg.style.height = `${plant.size?.height || 40}px`;
    plantImg.style.left = `${spaceRadius - (plant.size?.width || 40) / 2}px`;
    plantImg.style.top = `${spaceRadius - (plant.size?.height || 40) / 2}px`;
    plantImg.style.objectFit = 'contain';
    plantImg.draggable = false; // prevent nested drag weirdness

    
    // Add the elements to our drag image
    spaceCircle.appendChild(plantImg);
    dragImage.appendChild(spaceCircle);
    document.body.appendChild(dragImage);

    
    // Set the custom drag image
    // The offsets center the drag image on the cursor
    const offsetX = spaceRadius;
    const offsetY = spaceRadius;
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

    
    // Set this to be removed after drag operation
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
    
    
  };
  
  // Create a drag end handler to reset the dragged plant
  const onPlantDragEnd = () => {
    setDraggedPlantIndex(null);
  };

  return (
    <div
     className="border-2 border-amber-950 relative rounded-lg bg-[#ad8878]"
      style={{
        width: `${gardenSize.width * 40}px`,
        height: `${gardenSize.height * 40}px`,
        minWidth: "200px", // Minimum canvas size
        minHeight: "200px",
        position: 'relative', // Ensure absolute positioning works within this container
      }}
      onDrop={(e) => {
        handleDrop(e);
        setDraggedPlantIndex(null); // Reset drag state after drop
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Grid overlay to show planting spaces */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,128,0,0.1) 39px, rgba(0,128,0,0.1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,128,0,0.1) 39px, rgba(0,128,0,0.1) 40px)',
          backgroundSize: '40px 40px'
        }}
      />

      {gardenPlants.map((plant, index) => {
        // Calculate the space circle radius 
        // Convert space required to pixels (40px per foot)
        const spaceRadius = (plant.spaceRequired || 1) * 40;
        
        return (
          <div
            key={plant.id || index}
            className="absolute"
            style={{
              left: `${plant.x}px`,
              top: `${plant.y}px`,
              width: `${plant.size?.width || 40}px`,
              height: `${plant.size?.height || 40}px`,
              transition: 'all 0.2s ease',
              zIndex: 10,
            }}
          >
            {/* Space requirement circle - always visible */}
            <div 
              className="absolute rounded-full border-2 border-green-500 border-opacity-50"
              style={{
                width: `${spaceRadius * 2}px`,
                height: `${spaceRadius * 2}px`,
                left: `${-spaceRadius + (plant.size?.width || 40) / 2}px`,
                top: `${-spaceRadius + (plant.size?.height || 40) / 2}px`,
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />

            {/* Plant container */}
            <div
              className="absolute cursor-move w-full h-full"
              draggable
              onDragStart={onPlantDragStart(index)}
              onDragEnd={onPlantDragEnd}
              onClick={() => handlePlantClick(index)}
              title={`${plant.name} (${plant.spaceRequired} ft spacing)`}
            >
              <img 
                src={plant.image.src} 
                alt={plant.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform" 
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', // Subtle shadow for depth
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}