
export default function GardenCanvas({gardenSize, handleDrop, gardenPlants, handlePlantClick, handlePlantDragStart}) {
{/* Garden Canvas */}
return(
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
)
}