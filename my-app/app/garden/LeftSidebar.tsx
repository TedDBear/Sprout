import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LeftSidebar({ searchQuery, setSearchQuery, filteredPlants, handleNewPlantDragStart }) {
  // Create refs for the plant images
  const imageRefs = useRef({});
  const transparentImagesRef = useRef({});

  // Create transparent versions of the images with space requirement circles
 // Inside your useEffect where you create the canvas images
useEffect(() => {
  filteredPlants.forEach(plant => {
    if (!transparentImagesRef.current[plant.name]) {
      const img = new Image();
      img.onload = () => {
        // Create a canvas with appropriate dimensions
        const canvas = document.createElement('canvas');
        
        // Base display size for the plant image
        const displayWidth = 60;  // Equivalent to w-15
        const displayHeight = 40; // Equivalent to h-15
        
        // Calculate the space requirement circle size
        const circleRadius = plant.spaceRequired * 40; // Scale factor for visual clarity
        const canvasSize = Math.max(displayWidth, displayHeight, circleRadius * 2) + 20; // Add padding
        
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        
        // Draw the space requirement circle with adjusted opacity and stroke width
        // based on the circle size to ensure visibility
        ctx.beginPath();
        ctx.arc(canvasSize/2, canvasSize/2, circleRadius, 0, 2 * Math.PI);
        
        const sizeAdjustedOpacity = 100
        
        // Adjust stroke width based on size - larger circles get thicker strokes
        const baseStrokeWidth = 2;
        const sizeAdjustedStrokeWidth = Math.max(baseStrokeWidth, plant.spaceRequired);
        
        ctx.strokeStyle = `rgba(76, 175, 80, ${sizeAdjustedOpacity})`;
        ctx.lineWidth = sizeAdjustedStrokeWidth;
        ctx.stroke();
        
        // Draw the plant image in the center
        const imageX = (canvasSize - displayWidth) / 2;
        const imageY = (canvasSize - displayHeight) / 2;
        ctx.drawImage(img, imageX, imageY, displayWidth, displayHeight);
        
        // Create a new image from the canvas
        const transparentImg = new Image();
        transparentImg.src = canvas.toDataURL();
        transparentImg.className = "plant-drag-image";
        transparentImg.style.position = "absolute"; 
        transparentImg.style.left = "-9999px"; // Hide off-screen
        transparentImg.style.top = "-9999px";
        
        // Add to DOM for drag operations
        document.body.appendChild(transparentImg);
        transparentImagesRef.current[plant.name] = transparentImg;
      };
      img.src = plant.image.src;
    }
  });
  
  // Cleanup function
  return () => {
    Object.values(transparentImagesRef.current).forEach(img => {
      if (img && img.parentNode) {
        img.parentNode.removeChild(img);
      }
    });
  };
}, [filteredPlants]);

  return (
    <div className="w-72 h-150 flex-shrink-0 bg-white p-4 rounded-lg shadow-lg overflow-y-scroll">
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
            // Add this to your onDragStart handler
          onDragStart={(e) => {
            // First set data transfer
            e.dataTransfer.setData("text/plain", plant.name);
            
            // Use transparent image with circle if available
            const transparentImg = transparentImagesRef.current[plant.name];
            
            // Check if the image exists AND is fully loaded
            if (transparentImg && transparentImg.complete) {
              e.dataTransfer.setDragImage(transparentImg, transparentImg.width / 2, transparentImg.height / 2);
              handleNewPlantDragStart(plant, null)(e);
            } else {
              // If it's not ready yet, create it on-demand
              const tempCanvas = document.createElement('canvas');
              const plantImg = imageRefs.current[plant.name];
              
              // Only proceed if the plant image is loaded
              if (plantImg && plantImg.complete) {
                const circleRadius = plant.spaceRequired * 40;
                const canvasSize = Math.max(60, 40, circleRadius * 2) + 20;
                
                tempCanvas.width = canvasSize;
                tempCanvas.height = canvasSize;
                const ctx = tempCanvas.getContext('2d');
                
                // Draw circle
                ctx.beginPath();
                ctx.arc(canvasSize/2, canvasSize/2, circleRadius, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(76, 175, 80, 0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = 'rgba(76, 175, 80, 0.1)';
                ctx.fill();
                
                // Draw plant image
                const imageX = (canvasSize - 60) / 2;
                const imageY = (canvasSize - 40) / 2;
                ctx.drawImage(plantImg, imageX, imageY, 60, 40);
                
                // Create image for dragging
                const onDemandImg = new Image();
                onDemandImg.src = tempCanvas.toDataURL();
                document.body.appendChild(onDemandImg);
                onDemandImg.style.position = "absolute";
                onDemandImg.style.left = "-9999px";
                onDemandImg.style.top = "-9999px";
                
                // Use it for dragging
                e.dataTransfer.setDragImage(onDemandImg, onDemandImg.width / 2, onDemandImg.height / 2);
                
                // Clean up after drag ends
                setTimeout(() => {
                  if (onDemandImg.parentNode) {
                    onDemandImg.parentNode.removeChild(onDemandImg);
                  }
                }, 100);
              }
              
              handleNewPlantDragStart(plant, imageRefs.current[plant.name])(e);
            }
          }}
            className="cursor-pointer hover:bg-green-50 transition-colors"
          >
            <CardContent className="flex items-center space-x-2 p-2">
              <img
                ref={(el) => {
                  if (el) imageRefs.current[plant.name] = el;
                }}
                src={plant.image.src}
                alt={plant.name}
                className="w-15 h-15"
              />
              <div>
                <h3 className="font-semibold text-green-800">{plant.name}</h3>
                <p className="text-xs text-gray-500">{plant.description.substring(0, 47) + '...'}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}