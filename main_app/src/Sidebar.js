import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import cucumber from './graphics/Cucumber.png'
import tomato from './graphics/Tomato.png'
import corn from './graphics/Corn.png'
import carrot from './graphics/Carrot.png'
import broccoli from './graphics/Broccoli.png'
import './Sidebar.css'

const Sidebar = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('Drag any plant onto the dirt to plant it on your garden. To learn more about a particular plant, click on it.');
  console.log(description);
  const images = [
    { src: cucumber, desc: 'Cucumber: A refreshing vegetable often used in salads.' },
    { src: tomato, desc: 'Tomato: A juicy fruit commonly used in cooking and salads.' },
    { src: corn, desc: 'Corn: A versatile grain enjoyed as a vegetable or used in various dishes.' },
    { src: carrot, desc: 'Carrot: A crunchy root vegetable rich in beta-carotene.' },
    { src: broccoli, desc: 'Broccoli: A nutritious vegetable high in vitamins and minerals.' },
    // Add more image paths and descriptions as needed
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image.src);
    setDescription(image.desc);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <div className="drag" style={{ display: 'flex', flexDirection: 'row' }}>
            {images.map((image, index) => (
              <div key={index} onClick={() => handleImageClick(image)}>
                <DraggableItem id={image.src} imageSrc={image.src} />
              </div>
            ))}
          </div>
        </li>
      </ul>
      {selectedImage && (
        <div className="description">
          <img src={selectedImage} alt="Selected plant" style={{ width: '100px', height: '100px' }} />
          <p id='plant-description'>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;