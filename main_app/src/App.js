// App.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDropContainer from './DragDropContainer';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropContainer />
    </DndProvider>
  );
}

export default App;