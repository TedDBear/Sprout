// GardenCanvas.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GardenCanvas from '../app/garden/GardenCanvas';

describe('GardenCanvas Drag-and-Drop', () => {
  const mockPlant = {
    id: 1,
    name: 'Tomato',
    x: 40,
    y: 40,
    spaceRequired: 2,
    image: { src: 'tomato.png', alt: 'Tomato plant' },
    size: { width: 40, height: 40 }
  };

  test('plant appears in garden after drag-and-drop', () => {
    // Mock functions
    const mockHandleDrop = jest.fn(e => {
      e.preventDefault();
      return { x: e.clientX, y: e.clientY };
    });

    // Initial render with empty garden
    const { rerender } = render(
      <GardenCanvas
        gardenSize={{ width: 5, height: 5 }}
        gardenPlants={[]}
        handleDrop={mockHandleDrop}
        handlePlantClick={jest.fn()}
        handlePlantDragStart={jest.fn()}
      />
    );

    // Find garden area by its unique border class
    const gardenArea = document.querySelector('.border-green-200');
    
    // Simulate drop event
    fireEvent.drop(gardenArea!, {
      clientX: 100,
      clientY: 100,
      preventDefault: jest.fn(),
      dataTransfer: { getData: () => '1' }
    });

    // Re-render with plant added (simulating state update)
    rerender(
      <GardenCanvas
        gardenSize={{ width: 5, height: 5 }}
        gardenPlants={[mockPlant]}
        handleDrop={mockHandleDrop}
        handlePlantClick={jest.fn()}
        handlePlantDragStart={jest.fn()}
      />
    );

    // Verify results
    expect(screen.getByAltText('Tomato')).toBeInTheDocument();
    expect(mockHandleDrop).toHaveBeenCalled();
  });
});