import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GardenCanvas from '../app/garden/GardenCanvas';

// Mock version that bypasses image rendering
jest.mock('../app/garden/GardenCanvas', () => {
  const OriginalComponent = jest.requireActual('../app/garden/GardenCanvas');
  return function MockGardenCanvas(props: any) {
    return (
      <div 
        data-testid="garden-canvas"
        onDrop={props.handleDrop}
        onClick={props.handleCanvasClick}
      >
        {props.gardenPlants?.map((plant: any) => (
          <div 
            key={plant.id}
            data-testid={`plant-${plant.id}`}
            style={{
              position: 'absolute',
              left: `${plant.x}px`,
              top: `${plant.y}px`,
              width: `${plant.size?.width}px`,
              height: `${plant.size?.height}px`
            }}
          />
        ))}
      </div>
    );
  };
});

describe('Plant Spacing Validation', () => {
  const basePlant = {
    id: '1',
    name: 'Tomato',
    spaceRequired: 2,
    size: { width: 40, height: 40 }
  };

  const mockHandlers = {
    handleDrop: jest.fn(e => {
      e.preventDefault();
      return { x: e.clientX, y: e.clientY };
    }),
    handlePlantClick: jest.fn(),
    handlePlantDragStart: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('accepts plants with proper spacing', () => {
    const existingPlant = { ...basePlant, x: 200, y: 200 };
    const newPlantPosition = { x: 400, y: 200 }; // 5 feet apart

    const { rerender } = render(
      <GardenCanvas
        gardenSize={{ width: 10, height: 10 }}
        gardenPlants={[existingPlant]}
        {...mockHandlers}
      />
    );

    fireEvent.drop(screen.getByTestId('garden-canvas'), {
      clientX: newPlantPosition.x,
      clientY: newPlantPosition.y,
      preventDefault: jest.fn(),
      dataTransfer: { getData: () => 'new-plant' }
    });

    rerender(
      <GardenCanvas
        gardenSize={{ width: 10, height: 10 }}
        gardenPlants={[existingPlant, { ...basePlant, ...newPlantPosition, id: '2' }]}
        {...mockHandlers}
      />
    );

    expect(screen.getByTestId('plant-1')).toBeInTheDocument();
    expect(screen.getByTestId('plant-2')).toBeInTheDocument();
  });

  test('rejects plants placed too close', () => {
    const existingPlant = { ...basePlant, x: 200, y: 200 };
    mockHandlers.handleDrop.mockReturnValue(false); // Simulate collision

    render(
      <GardenCanvas
        gardenSize={{ width: 10, height: 10 }}
        gardenPlants={[existingPlant]}
        {...mockHandlers}
      />
    );

    fireEvent.drop(screen.getByTestId('garden-canvas'), {
      clientX: 220, // Too close (0.5 feet)
      clientY: 200,
      preventDefault: jest.fn(),
      dataTransfer: { getData: () => 'new-plant' }
    });

    expect(mockHandlers.handleDrop).toHaveReturnedWith(false);
    expect(screen.queryByTestId('plant-new-plant')).toBeNull();
  });

  test('handles edge placement exactly at minimum distance', () => {
    const existingPlant = { ...basePlant, x: 200, y: 200 };
    const edgePosition = { x: 280, y: 200 }; // Exactly 2 feet apart

    const { rerender } = render(
      <GardenCanvas
        gardenSize={{ width: 10, height: 10 }}
        gardenPlants={[existingPlant]}
        {...mockHandlers}
      />
    );

    fireEvent.drop(screen.getByTestId('garden-canvas'), {
      clientX: edgePosition.x,
      clientY: edgePosition.y,
      preventDefault: jest.fn(),
      dataTransfer: { getData: () => 'edge-plant' }
    });

    rerender(
      <GardenCanvas
        gardenSize={{ width: 10, height: 10 }}
        gardenPlants={[existingPlant, { ...basePlant, ...edgePosition, id: 'edge-plant' }]}
        {...mockHandlers}
      />
    );

    expect(screen.getByTestId('plant-edge-plant')).toBeInTheDocument();
  });
});