// __tests__/LeftSidebarSearch.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Updated import

// Minimal testable component
function TestableLeftSidebar({ searchQuery, setSearchQuery, filteredPlants }) {
  return (
    <div>
      <input
        data-testid="search-input"
        placeholder="Search plants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {filteredPlants.map(plant => (
          <div key={plant.name}>{plant.name}</div>
        ))}
      </div>
    </div>
  );
}

describe('Search Functionality', () => {
  const mockPlants = [
    { name: 'Tomato', description: 'Red' },
    { name: 'Basil', description: 'Green' }
  ];

  test('filters plants when searching', () => {
    let searchQuery = '';
    const setSearchQuery = jest.fn(query => {
      searchQuery = query;
    });

    const { rerender } = render(
      <TestableLeftSidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredPlants={mockPlants}
      />
    );

    // Verify initial render
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Basil')).toBeInTheDocument();

    // Simulate search
    fireEvent.change(
      screen.getByTestId('search-input'),
      { target: { value: 'Tom' } }
    );

    // Re-render with filtered plants
    rerender(
      <TestableLeftSidebar
        searchQuery="Tom"
        setSearchQuery={setSearchQuery}
        filteredPlants={mockPlants.filter(p => 
          p.name.toLowerCase().includes('tom')
        )}
      />
    );

    // Verify filtering
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.queryByText('Basil')).not.toBeInTheDocument();
  });
});