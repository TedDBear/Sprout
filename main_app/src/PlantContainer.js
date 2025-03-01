//import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import cucumber from './graphics/Cucumber.png'
import tomato from './graphics/Tomato.png'
import corn from './graphics/Corn.png'
import carrot from './graphics/Carrot.png'
import broccoli from './graphics/Broccoli.png'
import './PlantContainer.js'

const PlantContainer = () => {
const images = [
    { src: cucumber, desc: 'Cucumber: A refreshing vegetable often used in salads.' },
    { src: tomato, desc: 'Tomato: A juicy fruit commonly used in cooking and salads.' },
    { src: corn, desc: 'Corn: A versatile grain enjoyed as a vegetable or used in various dishes.' },
    { src: carrot, desc: 'Carrot: A crunchy root vegetable rich in beta-carotene.' },
    { src: broccoli, desc: 'Broccoli: A nutritious vegetable high in vitamins and minerals.' },
    // Add more image paths and descriptions as needed
  ];

  const handleImageClick = (image) => {
  };

  return (
    <div className="plant-container">
          <div className="drag" style={{ display: 'flex', flexDirection: 'column' }}>
            {images.map((image, index) => (
              <div key={index} onClick={() => handleImageClick(image)} style={{ display: 'flex', alignItems: 'center' }}>
              <DraggableItem id={image.src} imageSrc={image.src} />
              <p id='plant-description' style={{ marginLeft: '10px' }}>{image.desc}</p>
              </div>
            ))}
          </div>
    </div>
  );
}

export default PlantContainer;