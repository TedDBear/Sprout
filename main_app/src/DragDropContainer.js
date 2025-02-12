import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import DroppableArea from './DroppableArea';

const DragDropContainer = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ]);

  const handleDrop = (id) => {
    alert(`Dropped item with id: ${id}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div>
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id} text={item.text} />
        ))}
      </div>
      <DroppableArea onDrop={handleDrop} />
    </div>
  );
};

export default DragDropContainer;