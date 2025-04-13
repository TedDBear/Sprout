import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SproutGarden from '../app/garden/page'; // Adjusted the import path to the correct location

// Mock the document.createElemenet and URL.createObjectURL functions
beforeEach(() => {
  global.URL.createObjectURL = jest.fn(() => 'mock-url');
  document.createElement = jest.fn(() => ({
    href: '',
    download: '',
    click: jest.fn(),
    setAttribute: jest.fn(),
  }));
  document.body.appendChild = jest.fn();
  document.body.removeChild = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Save Garden Functionality', () => {
  it('should trigger file download when save button is clicked', () => {
    // Render the component
    render(<SproutGarden />);
    
    // Find the save button (you might need to adjust this based on your Header component)
    const saveButton = screen.getByText(/save/i); // This assumes your save button has "Save" text
    
    // Simulate click
    fireEvent.click(saveButton);
    
    // Verify that a download link was created
    expect(document.createElement).toHaveBeenCalledWith('a');
    
    // Verify the download was triggered
    const mockLink = document.createElement();
    expect(mockLink.click).toHaveBeenCalled();
    
    // Verify the link was added and removed from the DOM
    expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
    expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
    
    // Verify URL.createObjectURL was called
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});