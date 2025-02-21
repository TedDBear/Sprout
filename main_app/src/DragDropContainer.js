import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import DroppableArea from './DroppableArea';
import Sidebar from './Sidebar'

const DragDropContainer = () => {

  return (
    <div>
       <div className="container">
        <Sidebar />
        <DroppableArea />
      </div>
    </div>
  );
}


export default DragDropContainer;