import { useDrop } from 'react-dnd';
import { useState, useRef, useEffect } from 'react';

const DropZone = () => {
  const [droppedImages, setDroppedImages] = useState([]);
  const [size, setSize] = useState({ width: 20, height: 20 });
  const dropRef = useRef(null);
  const plant_width = 100;
  const plant_height = 100;
  const [{ isOver }, drop] = useDrop({
    accept: 'IMAGE',
    drop: (item, monitor) => {
      if (dropRef.current) {
        const delta = monitor.getClientOffset();
        const dropRect = dropRef.current.getBoundingClientRect();
        const left = delta.x - dropRect.left - plant_width / 2;
        const top = delta.y - dropRect.top - plant_height / 2;
        setDroppedImages((prev) => [...prev, { id: item.id, left, top }]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const removeItem = (item) => {
    setDroppedImages(droppedImages.filter(i => i !== item));
  };

  useEffect(() => {
    drop(dropRef);
  }, [drop]);

  const increaseWidth = () => {
    setSize((prevSize) => ({
      ...prevSize,
      width: prevSize.width < 70 ? prevSize.width + 5 : prevSize.width,
    }));
  };

  const decreaseWidth = () => {
    setSize((prevSize) => ({
      ...prevSize,
      width: prevSize.width > 20 ? prevSize.width - 5 : prevSize.width,
    }));
  };

  const increaseHeight = () => {
    setSize((prevSize) => ({
      ...prevSize,
      height: prevSize.height < 80 ? prevSize.height + 5 : prevSize.height,
    }));
  };

  const decreaseHeight = () => {
    setSize((prevSize) => ({
      ...prevSize,
      height: prevSize.height > 20 ? prevSize.height - 5 : prevSize.height,
    }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={increaseHeight}>Increase Height</button>
        <button onClick={decreaseHeight} style={{ marginTop: '10px' }}>Decrease Height</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div
          ref={dropRef}
          style={{
            width: `${size.width}vw`,
            height: `${size.height}vh`,
            backgroundColor: 'brown',
            border: '1px solid black',
            position: 'relative',
          }}
        >
          {droppedImages.map((image, index) => (
            <img
              className="plants"
              key={index}
              src={image.id}
              alt="Dropped"
              style={{ position: 'absolute', left: image.left, top: image.top }}
              onClick={() => removeItem(image)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px', marginTop: '10px' }}>
          <button onClick={increaseWidth} style={{ marginTop: '10px' }}>Increase Width</button>
          <button onClick={decreaseWidth} style={{ marginTop: '10px', left: '20px' }}>Decrease Width</button>
        </div>
      </div>
    </div>
  );
};

export default DropZone;