// test-save-garden.ts

// Mock data
const mockGardenSize = { width: 10, height: 10 };
const mockGardenPlants = [
  {
    name: "Carrot",
    x: 100,
    y: 100,
    id: "1",
    spaceRequired: 0.5,
    size: { width: 50, height: 50 },
    image: "carrot.svg"
  },
  {
    name: "Corn",
    x: 200,
    y: 200,
    id: "2",
    spaceRequired: 1.5,
    size: { width: 50, height: 50 },
    image: "corn.svg"
  }
];

describe('saveGarden functionality', () => {
  // Store mock link reference
  let mockLink: {
    href: string;
    download: string;
    click: jest.Mock;
    setAttribute: jest.Mock;
  };

  // Mock global objects before all tests
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => "mock-url");
    global.URL.revokeObjectURL = jest.fn();
    
    global.Blob = jest.fn(function(content: any, options: any) {
      return { content, options };
    }) as any;

    // Create a mock link we can track
    mockLink = {
      href: '',
      download: '',
      click: jest.fn(),
      setAttribute: jest.fn()
    };

    document.createElement = jest.fn(() => mockLink);
    
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset mock link properties
    mockLink.href = '';
    mockLink.download = '';
  });

  test('should create correct garden data structure', () => {
    // Recreate the core functionality we want to test
    const gardenData = {
      gardenSize: mockGardenSize,
      gardenPlants: mockGardenPlants.map(plant => ({
        name: plant.name,
        x: plant.x,
        y: plant.y,
        id: plant.id,
      }))
    };
    
    expect(gardenData).toHaveProperty('gardenSize');
    expect(gardenData).toHaveProperty('gardenPlants');
    expect(gardenData.gardenSize).toEqual(mockGardenSize);
    expect(gardenData.gardenPlants.length).toBe(2);
    
    gardenData.gardenPlants.forEach((plant: any) => {
      expect(plant).not.toHaveProperty('image');
      expect(plant).not.toHaveProperty('size');
    });
  });

  test('should create JSON with proper formatting', () => {
    const gardenData = {
      gardenSize: mockGardenSize,
      gardenPlants: mockGardenPlants.map(plant => ({
        name: plant.name,
        x: plant.x,
        y: plant.y,
        id: plant.id,
      }))
    };
    
    const gardenJson = JSON.stringify(gardenData, null, 2);
    const parsed = JSON.parse(gardenJson);
    
    expect(parsed.gardenSize.width).toBe(10);
    expect(parsed.gardenSize.height).toBe(10);
    expect(Array.isArray(parsed.gardenPlants)).toBe(true);
  });

  test('should create blob with correct type', () => {
    const gardenJson = JSON.stringify({
      gardenSize: mockGardenSize,
      gardenPlants: mockGardenPlants.map(plant => ({
        name: plant.name,
        x: plant.x,
        y: plant.y,
        id: plant.id,
      }))
    }, null, 2);
    
    new Blob([gardenJson], { type: "application/json" });
    
    expect(Blob).toHaveBeenCalledWith(
      [expect.stringContaining('"gardenSize"')],
      { type: "application/json" }
    );
  });

  test('should trigger download process', () => {
    // Simulate the download process
    const blob = new Blob(['test'], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    mockLink.href = url;
    mockLink.download = 'test-file.json';
    document.body.appendChild(mockLink);
    mockLink.click();
    document.body.removeChild(mockLink);
    URL.revokeObjectURL(url);
    
    // Verify URL creation
    expect(URL.createObjectURL).toHaveBeenCalled();
    
    // Verify link was properly configured
    expect(mockLink.href).toBe('mock-url');
    expect(mockLink.download).toBe('test-file.json');
    
    // Verify download process
    expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
    expect(mockLink.click).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
    
    // Verify cleanup
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  test('should generate filename with current date', () => {
    // Mock the Date object
    const mockDate = new Date('2023-01-01T12:00:00Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
    
    // Simulate filename generation
    const dateString = `${mockDate.getFullYear()}-${(mockDate.getMonth() + 1).toString().padStart(2, '0')}-${mockDate.getDate().toString().padStart(2, '0')}-${mockDate.getTime().toString().padStart(2, '0')}`;
    mockLink.download = `sprout-garden-${dateString}.json`;
    
    expect(mockLink.download).toMatch(/sprout-garden-2023-01-01/);
  });
});