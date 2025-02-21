import { useDrag } from 'react-dnd';

//Allows an image to be dragged onto the drop zone.
const DraggableItem = ({ id, imageSrc }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img class='plants' src={imageSrc} alt="Draggable"/>
    </div>
  );
};

export default DraggableItem;
