export default function GardenCanvas({gardenSize, handleDrop, gardenPlants, handlePlantClick, handlePlantDragStart}) {
  return (
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
          key={plant.id || index}
          className="absolute cursor-move"
          style={{
            left: `${plant.x}px`,
            top: `${plant.y}px`,
            width: "40px",
            height: "40px",
          }}
          draggable
          onDragStart={handlePlantDragStart(index)}
          onClick={() => handlePlantClick(index)}
          title={plant.name}
        >
          <img 
            src={plant.image.src} 
            alt={plant.name}
            className="w-10 h-10 object-contain" 
          />
        </div>
      ))}
    </div>
  );
}