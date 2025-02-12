// DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className='drag'
      ref={drag}
      style={{opacity: isDragging ? 0.5 : 1}}
    >
      {text}
    </div>
  );
};

export default DraggableItem;
