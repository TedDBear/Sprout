// DroppableArea.js
import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className='drop'
      ref={drop}
      style={{backgroundColor: isOver ? 'lightgreen' : 'white'}}
    >
      Drop here
    </div>
  );
};

export default DroppableArea;
