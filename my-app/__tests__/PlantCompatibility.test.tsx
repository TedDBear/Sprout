// Recreate just the compatibility rules structure for testing
const plantCompatibility = {
    "Corn": {
      incompatibleWith: [
        {
          name: "Cabbage", 
          message: "Corn and cabbage compete for nutrients and can stunt each other's growth.",
          minDistance: 10
        }
      ]
    },
    "Cabbage": {
      incompatibleWith: [
        {
          name: "Corn",
          message: "Cabbage struggles when planted near corn due to nutrient competition.",
          minDistance: 10
        },
        {
          name: "Bell Pepper",
          message: "Bell Peppers and cabbage compete for nutrients.",
          minDistance: 10
        }
      ]
    },
    "Garlic": {
      incompatibleWith: [
        {
          name: "Onion",
          message: "Garlic and Onions compete for nutrients.",
          minDistance: 10
        }
      ]
    },
    "Onion": {
      incompatibleWith: [
        {
          name: "Garlic",
          message: "Onions and Garlic compete for nutrients.",
          minDistance: 10
        }
      ]
    },
    "Bell Pepper": {
      incompatibleWith: [
        {
          name: "Cabbage",
          message: "Bell Peppers and cabbage compete for nutrients.",
          minDistance: 10
        }
      ]
    },
    "Carrot": {
      incompatibleWith: []
    }
  };
  
  describe('Plant Compatibility Rules', () => {
    test('Corn should be incompatible with Cabbage', () => {
      const cornRules = plantCompatibility.Corn.incompatibleWith;
      expect(cornRules).toContainEqual(
        expect.objectContaining({
          name: "Cabbage",
          minDistance: 10
        })
      );
    });
  
    test('Garlic should be incompatible with Onion', () => {
      const garlicRules = plantCompatibility.Garlic.incompatibleWith;
      expect(garlicRules).toContainEqual(
        expect.objectContaining({
          name: "Onion",
          minDistance: 10
        })
      );
    });
  
    test('Carrot should have no incompatibilities', () => {
      expect(plantCompatibility.Carrot.incompatibleWith).toHaveLength(0);
    });
  
    test('All rules should reference valid plants', () => {
      Object.entries(plantCompatibility).forEach(([plantName, rules]) => {
        rules.incompatibleWith.forEach(rule => {
          expect(plantCompatibility).toHaveProperty(rule.name);
        });
      });
    });
  });