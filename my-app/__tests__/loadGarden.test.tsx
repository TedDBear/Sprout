// Mock FileReader (same as before)
class MockFileReader {
    constructor() {
      this.onload = null;
      this.onerror = null;
    }
  
    readAsText(file) {
      if (file.name === 'valid_garden.json') {
        const gardenData = {
          gardenSize: { width: 12, height: 12 },
          gardenPlants: [
            { name: "Carrot", x: 50, y: 50, id: "1" },
            { name: "Corn", x: 200, y: 200, id: "2" }
          ]
        };
        this.result = JSON.stringify(gardenData);
        this.onload({ target: this });
      }
      // ... other file cases ...
    }
  }
  
  global.FileReader = MockFileReader;
  global.alert = jest.fn();
  
  // The function we want to test
  const loadGarden = (file, setGardenSize, setGardenPlants, setSelectedPlant) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate the data structure
        if (!data.gardenSize || !data.gardenPlants || !Array.isArray(data.gardenPlants)) {
          throw new Error("Invalid garden file format");
        }
        
        // Set the garden size
        setGardenSize(data.gardenSize);
        
        // Process the plants and fully restore the plant objects
        const loadedPlants = data.gardenPlants.map(plant => {
          // Find the corresponding plant definition
          const plantDefinition = plants.find(p => p.name === plant.name);
          
          if (!plantDefinition) {
            throw new Error(`Unknown plant type: ${plant.name}`);
          }
          
          return {
            ...plantDefinition,
            x: plant.x,
            y: plant.y,
            id: plant.id || Date.now().toString(),
          };
        });
        
        // Filter out colliding plants
        const nonCollidingPlants = [];
        for (const plant of loadedPlants) {
          const wouldCollide = nonCollidingPlants.some(existingPlant => {
            const combinedSpace = (plant.spaceRequired + existingPlant.spaceRequired) * 40;
            const distance = Math.sqrt(
              Math.pow(
                plant.x + (plant.size?.width || 40) / 2 - 
                (existingPlant.x + (existingPlant.size?.width || 40) / 2), 
                2
              ) + 
              Math.pow(
                plant.y + (plant.size?.height || 40) / 2 - 
                (existingPlant.y + (existingPlant.size?.height || 40) / 2), 
                2
              )
            );
            return distance < combinedSpace;
          });
          
          if (!wouldCollide) {
            nonCollidingPlants.push(plant);
          }
        }
        
        setGardenPlants(nonCollidingPlants);
        setSelectedPlant(null);
        
      } catch (error) {
        console.error("Error loading garden:", error);
        alert(`Error loading garden: ${error.message}`);
      }
    };
    
    reader.onerror = () => {
      alert("Error reading garden file");
    };
    
    reader.readAsText(file);
  };
  
  // Mock plants data (simplified version from your component)
  const plants = [
    { 
      name: "Carrot",
      spaceRequired: 0.5,
      size: { width: 50, height: 50 }
    },
    { 
      name: "Corn",
      spaceRequired: 1.5,
      size: { width: 50, height: 50 }
    }
  ];
  
  describe('loadGarden', () => {
    // Test cases remain the same as before
    it('should load a valid garden file correctly', () => {
      const mockSetGardenSize = jest.fn();
      const mockSetGardenPlants = jest.fn();
      const mockSetSelectedPlant = jest.fn();
  
      const validFile = { name: 'valid_garden.json' };
      loadGarden(validFile, mockSetGardenSize, mockSetGardenPlants, mockSetSelectedPlant);
  
      expect(mockSetGardenSize).toHaveBeenCalledWith({ width: 12, height: 12 });
      expect(mockSetGardenPlants).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: "Carrot", x: 50, y: 50 }),
          expect.objectContaining({ name: "Corn", x: 200, y: 200 })
        ])
      );
      expect(mockSetSelectedPlant).toHaveBeenCalledWith(null);
    });
  
    // ... other test cases ...
  });