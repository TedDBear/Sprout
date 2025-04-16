import React from 'react';

//The closest thing I could find for brown in tailwind is bg-orange-500/75

export default function GardenCanvas({
  gardenSize, 
  handleDrop, 
  gardenPlants, 
  handlePlantClick, 
  handlePlantDragStart
}) {
  return (
    <div
      className="border-2 border-green-200 relative rounded-lg bg-orange-500/75"
      style={{
        width: `${gardenSize.width * 40}px`,
        height: `${gardenSize.height * 40}px`,
        minWidth: "200px", // Minimum canvas size
        minHeight: "200px",
        position: 'relative', // Ensure absolute positioning works within this container
      }}
      onDrop={handleDrop}
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
            {/* Space requirement circle */}
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
              onDragStart={handlePlantDragStart(index)}
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