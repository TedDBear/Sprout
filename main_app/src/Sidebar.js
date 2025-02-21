import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import cucumber from './graphics/Cucumber.png'
import tomato from './graphics/Tomato.png'
import corn from './graphics/Corn.png'
import carrot from './graphics/Carrot.png'
import broccoli from './graphics/Broccoli.png'
import './Sidebar.css'

const Sidebar = () => {
  const images = [
    cucumber,
    tomato,
    corn,
    carrot,
    broccoli,
    // Add more image paths as needed
  ];
  //returns a side bar. If you want to mess with the style, go into App.css and change 
    return (
      <div className="sidebar">
        <ul>
          <li>
            <div className="drag" style={{ display: 'flex', flexDirection: 'row' }}>
              {images.map((imageSrc, index) => (
                <DraggableItem key={index} id={imageSrc} imageSrc={imageSrc} />
              ))}
            </div>
          </li>
        </ul>
      </div>
    );
  };


export default Sidebar;