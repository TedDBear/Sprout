'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import Header from './header'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSideBar'
import GardenCanvas from './GardenCanvas'
import GardenSizeControls from './GardenSizeControls'
import corn from './graphics/Corn.svg'
import cabbage from './graphics/Cabbage.svg'
import blueberry from './graphics/Blueberry.svg'
import carrot from './graphics/Carrot.svg'
import garlic from './graphics/Garlic.svg'
import onion from './graphics/Onion.svg'
import BellPepper from './graphics/Bell Pepper.svg'
import Basil from './graphics/Basil.svg'
import Broccoli from './graphics/Broccoli.svg'
import Rose from './graphics/Rose.svg'
import GreenBean from './graphics/Green bean.svg'
import Potato from './graphics/Potato.svg'
import Pumpkin from './graphics/Pumpkin.svg'
import Rosemary from './graphics/Rosemary.svg'
import Sage from './graphics/Sage.svg'
import Strawberry from './graphics/Strawberry.svg'
import Lily from './graphics/Lily.svg'
import Tomato from './graphics/Tomato.svg'
import Watermelon from './graphics/Watermelon.svg'
import Tulip from './graphics/Tulip.svg'

// --- Constants (Plant Data, Compatibility Rules) ---

const plants = [
  {
    name: 'Tomato',
    image: Tomato,
    description:
      'Fruiting plant, grown as an annual. Comes in vining or bush types. Diverse fruit sizes/colors.',
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    apiTag: 'Tomato',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '24-36 inches',
    depth: '1/4th inch (seed)',
    notes:
      'It is best to grow plants purchased that are about 6-8 inches tall.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Carrot',
    image: carrot,
    description:
      'A root vegetable. It is usually orange in color, but some cultivars are purple, black, red, white, and yellow.',
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Carrot',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '12 inches',
    depth: '1/2 inch',
    notes: 'Harvest when 1-1.5 inches in diameter.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Corn',
    image: corn,
    description: 'A leafy stalk that produces ears after pollination.',
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Corn',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '12-24 inches',
    depth: '1 inch',
    notes: 'Harvest after the silk has turned dark brown.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Potato',
    image: Potato,
    description: 'A starchy root vegetable.',
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    apiTag: 'Potato',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '8-12 inches',
    depth: '6 inches(from seed potatoes)',
    notes:
      'Cut seed potatoes into quarters, then plant. Harvest when tops die.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Cabbage',
    image: cabbage,
    description:
      'Dense, layered heads grow on stalks and are surrounded by looser outer leaves. Its leaves can be green, white, or purple in color, and smooth or crinkly in texture. Depending on the variety, the head can be round, oblong, or flat.',
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    apiTag: 'Cabbage',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '24 inches',
    depth: '1/4th inch',
    notes: 'None.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Bell Pepper',
    image: BellPepper,
    description:
      'Sweet pepper variety (no heat) with blocky, thick-walled fruit. Matures from green to various colors. Bushy plant, grown as an annual.',
    spaceRequired: 1.5,
    size: { width: 50, height: 50 },
    apiTag: 'Bell Pepper',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '18-24 inches',
    depth: '1/4th inch',
    notes:
      'Harvest when dark green, or later when they ripen to red, yellow, or purple.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Broccoli',
    image: Broccoli,
    description:
      "Large flower heads known as 'crowns' that are green to blue-green in color, grouped tightly together atop a thick stem, and surrounded by leaves.",
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Broccoli',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '12-18 inches',
    depth: '1/4th inch',
    notes: 'Harvest when head is 6-8 inches in diameter.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Green bean',
    image: GreenBean,
    description: 'An upright bush bean with medium-thick green pods.',
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Green bean',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '12-15 inches',
    depth: '1 inch',
    notes: 'Harvesting when ripe encourages more production.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Garlic',
    image: garlic,
    description:
      'A bulbous root separated into cloves and a tall stalk with branching leaves.',
    spaceRequired: 0.5,
    size: { width: 50, height: 50 },
    apiTag: 'Garlic',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '6 inches',
    depth: '1 inch',
    notes:
      'Harvest when lower leaves begin to brown, then dry for 10-14 days to increase shelf life.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Onion',
    image: onion,
    description:
      'A bulbous vegetable. It comes in different colors, including white, yellow, and red.',
    spaceRequired: 0.5,
    size: { width: 50, height: 50 },
    apiTag: 'Onion',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '6-10 inches',
    depth: '1/4th inch',
    notes: 'Harvest when leaves fall over, then dry for 1-2 days.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Pumpkin',
    image: Pumpkin,
    description:
      'Squash cultivars that are round to oval in shape with thick, slightly ribbed skin that varies from deep yellow to orange in color. Their flesh ranges from yellow to gold and has large seeds.',
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    apiTag: 'Pumpkin',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '24 inches',
    depth: '1/2-3/4th inch',
    notes: 'Harvest when bright orange.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Blueberry',
    image: blueberry,
    description:
      'Deciduous fruiting shrub (perennial). Produces small blue-purple berries. Often has attractive fall foliage.',
    spaceRequired: 2.5,
    size: { width: 50, height: 50 },
    apiTag: 'Blueberry',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '5-6ft',
    depth: '1/4th inch',
    notes: 'None.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Watermelon',
    image: Watermelon,
    description:
      'A species of melon that produces round or oblong fruits with thick skin and sweet, watery flesh.',
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    apiTag: 'Watermelon',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '24 inches',
    depth: '1-1.5 inches',
    notes: 'Plant six to eight seeds in one plot.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Strawberry',
    image: Strawberry,
    description: 'A sweet, bright red fruit.',
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Strawberry',
    waterAmount: 'Medium',
    lightLevel: 'Full sun - Partial shade',
    spacing: '12-15 inches',
    depth: '1/4th inch',
    notes: 'None.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Basil',
    image: Basil,
    description:
      'Aromatic culinary herb, typically grown as an annual. Prized for flavorful leaves. Upright, bushy growth.',
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Basil',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '12 inches',
    depth: '1/4th inch',
    notes: 'None.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Rosemary',
    image: Rosemary,
    description:
      'A woody, perennial herb with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region.',
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Rosemary',
    waterAmount: 'Low',
    lightLevel: 'Full sun',
    spacing: '12 inches',
    depth: '1/4th inch',
    notes: 'None.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Sage',
    image: Sage,
    description:
      'An evergreen shrub with woody stems, soft green-gray leaves, and blue to purplish flowers.',
    spaceRequired: 1,
    size: { width: 50, height: 50 },
    apiTag: 'Sage',
    waterAmount: 'Low',
    lightLevel: 'Full sun - Partial shade',
    spacing: '12-15 inches',
    depth: '1/4th inch',
    notes: 'None.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Lily',
    image: Lily,
    description:
      'A large, fragrant, trumpet-shaped white flower with yellow throats and maroon spots. The plant has long, narrow leaves that grow in a whorled pattern.',
    spaceRequired: 1.5,
    size: { width: 50, height: 50 },
    apiTag: 'Lily',
    waterAmount: 'Low',
    lightLevel: 'Full shade',
    spacing: '18-24 inches',
    depth: '2-4inches for small varieties, 6 inches large varieties.',
    notes: 'Plant bulbs in groups of three. Very toxic to pets.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Rose',
    image: Rose,
    description: 'Large, fragrant, deep red blooms.',
    spaceRequired: 2,
    size: { width: 50, height: 50 },
    apiTag: 'Rose',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '24-36 inches',
    depth: '1/4th inch',
    notes: 'Requires careful pruning for best blooms.',
    problemPlants: [],
    hasWarning: false
  },
  {
    name: 'Tulip',
    image: Tulip,
    description:
      'A large, cup-shaped flower that is usually red, orange or yellow in color.',
    spaceRequired: 1.5,
    size: { width: 50, height: 50 },
    apiTag: 'Tulip',
    waterAmount: 'Medium',
    lightLevel: 'Full sun',
    spacing: '18-24 inches',
    depth: '6-8 inches',
    notes: 'Toxic to pets.',
    problemPlants: [],
    hasWarning: false
  }
]

const plantCompatibility = {
  Tomato: {
    incompatibleWith: [
      {
        name: 'Potato',
        message:
          'Tomatoes and potatoes are both susceptible to blight, which can spread between them.',
        minDistance: 10
      },
      {
        name: 'Corn',
        message:
          'Corn can attract pests that also target tomatoes, leading to increased pest pressure.',
        minDistance: 10
      },
      {
        name: 'Cabbage',
        message:
          "Cabbage and tomatoes can compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      }
    ]
  },
  Carrot: { incompatibleWith: [] },
  Corn: {
    incompatibleWith: [
      {
        name: 'Cabbage',
        message:
          "Corn and cabbage compete for nutrients and can stunt each other's growth. Corn's tall structure may also shade the cabbage.",
        minDistance: 10
      },
      {
        name: 'Broccoli',
        message:
          'Corn and Broccoli compete for nutrients, and corn may can block the broccoli from getting enough sunlight.',
        minDistance: 10
      },
      {
        name: 'Tomato',
        message:
          'Corn can attract pests that also target tomatoes, leading to increased pest pressure.',
        minDistance: 10
      }
    ]
  },
  Cabbage: {
    incompatibleWith: [
      {
        name: 'Strawberry',
        message: 'Strawberries can attract pests that are harmful to cabbage.',
        minDistance: 10
      },
      {
        name: 'Corn',
        message:
          'Cabbage struggles when planted near corn due to nutrient competition and potential shading.',
        minDistance: 10
      },
      {
        name: 'Tomato',
        message:
          "Cabbage and tomatoes can compete for nutrients and scan stunt each other's growth.",
        minDistance: 10
      }
    ]
  },
  Blueberry: {
    incompatibleWith: [
      {
        name: 'Sage',
        message:
          'Sage is a part of the mint family, which spread quickly and may overtake the blueberries',
        minDistance: 10
      },
      {
        name: 'Rosemary',
        message:
          'Rosemary is a part of the mint family, which spread quickly and may overtake the blueberries',
        minDistance: 10
      }
    ]
  },
  Garlic: {
    incompatibleWith: [
      {
        name: 'Onion',
        message:
          "Garlic and Onions compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: 'Green bean',
        message:
          'The strong scent of Garlic can stunt the growth of green beans and reduce their yield.',
        minDistance: 10
      }
    ]
  },
  'Bell Pepper': {
    incompatibleWith: [
      {
        name: 'Strawberry',
        message:
          'Bell peppers have been known to transmit a fungal disease to strawberries.',
        minDistance: 10
      }
    ]
  },
  Onion: {
    incompatibleWith: [
      {
        name: 'Garlic',
        message:
          "Garlic and Onions compete for nutrients and can stunt each other's growth.",
        minDistance: 10
      },
      {
        name: 'Pumpkin',
        message:
          'Pumpkins require a lot of water and space, which affect the onions significantly.',
        minDistance: 10
      },
      {
        name: 'Potato',
        message: 'Onions greatly affect the taste of potatoes.',
        minDistance: 10
      }
    ]
  },
  Sage: {
    incompatibleWith: [
      {
        name: 'Blueberry',
        message:
          'Blueberries do not grow well with mint-like plants such as sage, as they tend to overtake the blueberries.',
        minDistance: 10
      }
    ]
  },
  Rosemary: {
    incompatibleWith: [
      {
        name: 'Blueberry',
        message:
          'Blueberries do not grow well with mint-like plants such as rosemary, as they tend to overtake the blueberries.',
        minDistance: 10
      }
    ]
  },
  'Green bean': {
    incompatibleWith: [
      {
        name: 'Garlic',
        message:
          'The strong scent of Garlic can stunt the growth of green beans and reduce their yield.',
        minDistance: 10
      },
      {
        name: 'Onion',
        message:
          'The strong scent of onions can stunt the growth of green beans and reduce their yield.',
        minDistance: 10
      }
    ]
  },
  Strawberry: {
    incompatibleWith: [
      {
        name: 'Cabbage',
        message: 'Strawberries can attract pests that are harmful to cabbage.',
        minDistance: 10
      },
      {
        name: 'Bell Pepper',
        message:
          'Bell peppers have been known to transmit a fungal disease to strawberries.',
        minDistance: 10
      }
    ]
  },
  Potato: {
    incompatibleWith: [
      {
        name: 'Tomato',
        message:
          'Tomatoes and potatoes are both susceptible to blight, which can spread between them.',
        minDistance: 10
      }
    ]
  }
}

// --- Utility Functions ---

// Calculates distance between the centers of two plant objects in pixels
const calculatePixelDistance = (plantA, plantB) => {
  if (!plantA?.size || !plantB?.size) return Infinity // Avoid errors if size is missing
  const centerAx = plantA.x + (plantA.size?.width || 40) / 2
  const centerAy = plantA.y + (plantA.size?.height || 40) / 2
  const centerBx = plantB.x + (plantB.size?.width || 40) / 2
  const centerBy = plantB.y + (plantB.size?.height || 40) / 2
  return Math.sqrt(
    Math.pow(centerAx - centerBx, 2) + Math.pow(centerAy - centerBy, 2)
  )
}

// Checks compatibility JUST between plantA and plantB based on rules and distance
const checkSinglePairCompatibility = (plantA, plantB) => {
  if (
    !plantA ||
    !plantB ||
    plantA.id === plantB.id ||
    !plantA.name ||
    !plantB.name
  ) {
    // Added checks for name
    return {
      hasWarning: false,
      message: null,
      distance: Infinity,
      minDistance: 0
    }
  }

  const pixelDistance = calculatePixelDistance(plantA, plantB)
  const distanceInFeet = pixelDistance / 40 // Convert to feet (assuming 40px = 1 foot)

  // Check A -> B incompatibility
  const compatibilityA = plantCompatibility[plantA.name]
  const ruleA = compatibilityA?.incompatibleWith?.find(
    rule => rule.name === plantB.name
  )
  if (ruleA && distanceInFeet <= ruleA.minDistance) {
    return {
      hasWarning: true,
      message: ruleA.message,
      distance: distanceInFeet,
      minDistance: ruleA.minDistance
    }
  }

  // Check B -> A incompatibility
  const compatibilityB = plantCompatibility[plantB.name]
  const ruleB = compatibilityB?.incompatibleWith?.find(
    rule => rule.name === plantA.name
  )
  if (ruleB && distanceInFeet <= ruleB.minDistance) {
    return {
      hasWarning: true,
      // Use B's message if available, otherwise fallback to A's (if it existed but distance was ok before)
      message: ruleB.message || ruleA?.message,
      distance: distanceInFeet,
      minDistance: ruleB.minDistance
    }
  }

  // No incompatibility found within minimum distance
  return {
    hasWarning: false,
    message: null,
    distance: distanceInFeet,
    minDistance: 0
  }
}

// Calculates all warnings for a given array of plants
// Returns a NEW array with NEW plant objects containing updated warning info
const calculateWarningsForGarden = (currentPlants, warningsEnabled = true) => {
  // Map to new objects to ensure immutability from the start
  let plantsWithData = currentPlants.map(plant => ({
    ...plant, // Copy existing properties
    problemPlants: [], // Reset/Initialize problem list
    hasWarning: false, // Reset/Initialize warning flag
    warningMessages: [] // Optional: store specific messages
  }))

  if (warningsEnabled) {
    // Compare every pair of plants
    for (let i = 0; i < plantsWithData.length; i++) {
      for (let j = i + 1; j < plantsWithData.length; j++) {
        // Start j from i + 1
        const plantA = plantsWithData[i]
        const plantB = plantsWithData[j]

        const compatibilityResult = checkSinglePairCompatibility(plantA, plantB)

        if (compatibilityResult.hasWarning) {
          // Add IDs to each other's problem lists IN THE NEW OBJECTS
          plantA.problemPlants.push(plantB.id)
          plantB.problemPlants.push(plantA.id)

          // Store detailed messages
          const messageA = `Conflict with ${
            plantB.name
          } (${compatibilityResult.distance.toFixed(1)} ft): ${
            compatibilityResult.message
          } (Min: ${compatibilityResult.minDistance} ft)`
          const messageB = `Conflict with ${
            plantA.name
          } (${compatibilityResult.distance.toFixed(1)} ft): ${
            compatibilityResult.message
          } (Min: ${compatibilityResult.minDistance} ft)`
          plantA.warningMessages.push(messageA)
          plantB.warningMessages.push(messageB)
        }
      }
    }

    // Final pass to set the hasWarning flag based on populated problemPlants
    plantsWithData.forEach(plant => {
      plant.hasWarning = plant.problemPlants.length > 0
    })
  } // else: if warnings are disabled, all plants retain hasWarning: false

  // Return the new array with updated objects
  return plantsWithData
}

// --- React Component ---

export default function SproutGarden () {
  const [gardenSize, setGardenSize] = useState({ width: 10, height: 10 })
  const [gardenPlants, setGardenPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [draggedPlant, setDraggedPlant] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState(-1)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [enableWarnings, setEnableWarnings] = useState(true)

  // --- Effect for Recalculating Warnings on Toggle ---
  useEffect(() => {
    // Recalculate warnings for the current garden whenever enableWarnings changes
    setGardenPlants(prevGardenPlants =>
      calculateWarningsForGarden(prevGardenPlants, enableWarnings)
    )
  }, [enableWarnings]) // Dependency array includes enableWarnings

  // --- Collision Check (Spacing based on spaceRequired) ---
  // Checks if 'plantToCheck' overlaps with any 'otherPlants' based on their spaceRequired
  const checkSpacingCollision = (plantToCheck, otherPlants) => {
    return otherPlants.some(existingPlant => {
      if (!existingPlant || plantToCheck.id === existingPlant.id) 
        {
          return false // Don't check against self or invalid
        }

      // Ensure spaceRequired exists and is a number
      const spaceA = Number(plantToCheck.spaceRequired) || 0
      const spaceB = Number(existingPlant.spaceRequired) || 0
      if (spaceA <= 0 || spaceB <= 0) return false // Cannot collide if no space required

      // Calculate the minimum required distance between centers based on spaceRequired (in pixels)
      const minCenterDistance = (spaceA + spaceB) * 40 // Assuming 40px/foot and that the circles displayed cannot intersect.

      const actualCenterDistance = calculatePixelDistance(
        plantToCheck,
        existingPlant
      )

      return actualCenterDistance < minCenterDistance
    })
  }

  // --- Event Handlers ---

  const handleNewPlantDragStart = useCallback(
    (plant, imgElement) => e => {
      setDraggedPlant(plant) // Store the template plant info
      try {
        // Use try-catch for dataTransfer in case of strict browser policies
        e.dataTransfer.setData('text/plain', plant.name || '') // Ensure name exists
        if (imgElement) {
          e.dataTransfer.setDragImage(imgElement, 30, 30) // Adjust offset as needed
        }
      } catch (error) {
        console.warn('Could not set dataTransfer data:', error)
      }
    },
    []
  ) // No dependencies, safe to memoize

  const handlePlantDragStart = useCallback(
    index => e => {
      if (index >= 0 && index < gardenPlants.length) {
        setDraggedIndex(index) // Store index of the plant being moved
        try {
          e.dataTransfer.setData('text/plain', gardenPlants[index]?.name || '')
        } catch (error) {
          console.warn('Could not set dataTransfer data:', error)
        }
      } else {
        console.error('Invalid index for drag start:', index)
      }
    },
    [gardenPlants]
  ) // Depends on gardenPlants

  const handlePlantClick = useCallback(
    (index, e) => {
      // Ensure index is valid before accessing
      if (index >= 0 && index < gardenPlants.length) {
        setSelectedPlant(gardenPlants[index])
      } else {
        console.error('Invalid index clicked:', index)
        setSelectedPlant(null)
      }
    },
    [gardenPlants]
  ) // Depends on gardenPlants

  const handleDrop = useCallback(
    e => {
      e.preventDefault()
      const rect = e.currentTarget.getBoundingClientRect()

      // Determine which plant is being dropped (new or existing)
      const sourcePlantData =
        draggedPlant || (draggedIndex >= 0 ? gardenPlants[draggedIndex] : null)
      if (!sourcePlantData) return // Nothing being dragged

      // Calculate drop position
      const dropX = e.clientX - rect.left
      const dropY = e.clientY - rect.top

      // Calculate top-left corner based on drop point and plant size (center drop)
      const plantWidth = sourcePlantData.size?.width || 40
      const plantHeight = sourcePlantData.size?.height || 40
      const x = dropX - plantWidth / 2
      const y = dropY - plantHeight / 2

      // Clamp position within bounds (ensure top-left stays within bounds)
      const maxX = gardenSize.width * 40 - plantWidth
      const maxY = gardenSize.height * 40 - plantHeight
      const clampedX = Math.max(0, Math.min(x, maxX))
      const clampedY = Math.max(0, Math.min(y, maxY))

      let potentialNextGarden
      let plantBeingPlaced // The specific plant object being added or moved
      let isMoving = draggedIndex >= 0

      if (isMoving) {
        // --- Moving Existing Plant ---
        plantBeingPlaced = {
          ...gardenPlants[draggedIndex],
          x: clampedX,
          y: clampedY
        }
        // Create the potential next state by replacing the moved plant
        potentialNextGarden = gardenPlants.map((plant, index) =>
          index === draggedIndex ? plantBeingPlaced : plant
        )
      } else {
        // --- Adding New Plant ---
        plantBeingPlaced = {
          ...draggedPlant, // Start with template data
          x: clampedX,
          y: clampedY,
          id: Date.now().toString() + Math.random(), // Ensure unique ID
          // Initialize warning fields (will be calculated later)
          problemPlants: [],
          hasWarning: false,
          warningMessages: []
        }
        potentialNextGarden = [...gardenPlants, plantBeingPlaced]
      }

      // --- Perform Checks ---

      // 1. Check SPACING Collision against ALL OTHER plants in the potential new layout
      const otherPlants = potentialNextGarden.filter(
        p => p.id !== plantBeingPlaced.id
      )
      const wouldCollideOnSpacing = checkSpacingCollision(
        plantBeingPlaced,
        otherPlants
      )

      if (wouldCollideOnSpacing) {
        alert(
          `Cannot place ${plantBeingPlaced.name} here. Too close to other plants (spacing requirement)!`
        )
        // Reset drag state cleanly
        setDraggedPlant(null)
        setDraggedIndex(-1)
        return
      }

      // 2. Calculate ALL Compatibility Warnings for the potential new garden state
      const finalGardenState = calculateWarningsForGarden(
        potentialNextGarden,
        enableWarnings
      )

      // 3. Find the data for the specific plant *after* warning calculations
      const placedPlantFinalData = finalGardenState.find(
        p => p.id === plantBeingPlaced.id
      )

      // --- Handle Confirmation (if warnings enabled and issues found for *this* plant) ---
      let userConfirmed = true
      if (enableWarnings && placedPlantFinalData?.hasWarning) {
        const warningText = placedPlantFinalData.warningMessages.join('\n\n')
        userConfirmed = window.confirm(
          `Warning: Placing/moving ${
            placedPlantFinalData.name
          } here causes compatibility issues:\n\n${warningText}\n\nDo you want to ${
            isMoving ? 'move' : 'place'
          } the plant anyway?`
        )
      }

      // --- Update State ---
      if (userConfirmed) {
        setGardenPlants(finalGardenState) // Update state with the fully calculated warnings
        setSelectedPlant(placedPlantFinalData) // Select the newly placed/moved plant (with updated warning status)
      } // else: If user cancelled due to warning, garden state remains unchanged

      // Reset drag state regardless of confirmation outcome
      setDraggedPlant(null)
      setDraggedIndex(-1)
    },
    [draggedPlant, draggedIndex, gardenPlants, gardenSize, enableWarnings]
  ) // Added dependencies

  const handleCloseDetails = useCallback(() => {
    setSelectedPlant(null)
  }, [])

  const handleDeletePlant = useCallback(
    plantIdToDelete => {
      // 1. Create the potential next state (plant removed)
      const gardenWithoutDeleted = gardenPlants.filter(
        plant => plant.id !== plantIdToDelete
      )

      // 2. Recalculate all warnings for the remaining plants
      const finalGardenState = calculateWarningsForGarden(
        gardenWithoutDeleted,
        enableWarnings
      )

      // 3. Update the state
      setGardenPlants(finalGardenState)
      setSelectedPlant(null) // Clear selection
    },
    [gardenPlants, enableWarnings]
  ) // Add dependencies

  const handleSizeChange = useCallback((field, value) => {
    const newValue = Math.min(21, Math.max(5, Number(value) + 1))
    setGardenSize(prev => ({ ...prev, [field]: newValue }))
  }, []) // No dependencies, safe to memoize

  const toggleWarnings = useCallback(() => {
    setEnableWarnings(prev => !prev)
    // The useEffect hook handles recalculating warnings based on the new 'enableWarnings' state
  }, [])

  // Filter plants for the LeftSidebar based on search query
  // Memoize if performance becomes an issue with large `plants` array
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const clearGarden = useCallback(() => {
    setGardenPlants([]) // Warnings implicitly cleared
    setSelectedPlant(null)
  }, [])

  const handleCanvasClick = useCallback(e => {
    // Only handle clicks directly on the canvas, not on plants
    if (e.target === e.currentTarget) {
      setSelectedPlant(null)
    }
  }, [])

  const saveGarden = useCallback(() => {
    // Prepare the garden data for saving
    const gardenData = {
      gardenSize,
      gardenPlants: gardenPlants.map(plant => ({
        name: plant.name,
        x: plant.x,
        y: plant.y,
        id: plant.id
      }))
    }
    const gardenJson = JSON.stringify(gardenData, null, 2)
    const blob = new Blob([gardenJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const date = new Date()
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date
      .getHours()
      .toString()
      .padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`
    link.download = `sprout-garden-${dateString}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [gardenSize, gardenPlants]) // Dependencies for saving

  const loadGarden = useCallback(
    file => {
      if (!file) return
      const reader = new FileReader()

      reader.onload = e => {
        if (!e.target?.result || typeof e.target.result !== 'string') {
          alert('Error reading file content.')
          return
        }
        try {
          const data = JSON.parse(e.target.result)
          if (
            !data.gardenSize ||
            !data.gardenPlants ||
            !Array.isArray(data.gardenPlants)
          ) {
            throw new Error('Invalid garden file format')
          }

          // Restore plants from saved data, merging with base plant definitions
          const loadedPlantObjects = data.gardenPlants
            .map(savedPlant => {
              if (!savedPlant || !savedPlant.name) return null // Basic validation
              const plantDefinition = plants.find(
                p => p.name === savedPlant.name
              )
              if (!plantDefinition) {
                console.warn(
                  `Unknown plant type "${savedPlant.name}" found in file. Skipping.`
                )
                return null // Skip unknown plants
              }
              // Validate position data
              const x = typeof savedPlant.x === 'number' ? savedPlant.x : 0
              const y = typeof savedPlant.y === 'number' ? savedPlant.y : 0

              return {
                ...plantDefinition, // Base data
                x: x,
                y: y,
                id: savedPlant.id || Date.now().toString() + Math.random(), // Ensure ID exists
                // Initialize warning fields, they will be calculated next
                problemPlants: [],
                hasWarning: false,
                warningMessages: []
              }
            })
            .filter(p => p !== null) // Remove any nulls from skipped plants

          // Calculate warnings for the loaded garden configuration
          const finalLoadedGardenState = calculateWarningsForGarden(
            loadedPlantObjects,
            enableWarnings
          ) // Use current warning toggle state

          // Update state
          setGardenSize(data.gardenSize) // Consider validating size values too
          setGardenPlants(finalLoadedGardenState)
          setSelectedPlant(null) // Clear selection
        } catch (error) {
          console.error('Error loading garden:', error)
          alert(`Error loading garden: ${error.message}`)
          // Optionally reset to empty state on error
          setGardenPlants([])
          setGardenSize({ width: 10, height: 10 })
          setSelectedPlant(null)
        }
      }

      reader.onerror = () => {
        console.error('Error reading garden file')
        alert('Error reading garden file')
      }

      reader.readAsText(file)
    },
    [enableWarnings]
  ) // Dependency: enableWarnings ensures loaded state respects current toggle

  // --- Render ---
  return (
    <div
      className='p-4 min-h-screen min-w-screen'
      style={{ backgroundColor: '#B2D4A7' }}
    >
      <Header
        clearGarden={clearGarden}
        saveGarden={saveGarden}
        loadGarden={loadGarden}
        toggleWarnings={toggleWarnings} // Pass toggle function
        enableWarnings={enableWarnings} // Pass current state for button visuals
      />
      {/* Added flex-col for small screens, md:flex-row for medium+ */}
      <div className='flex flex-col md:flex-row gap-4 max-w-8xl mx-auto mt-4'>
        <LeftSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} // Pass setter directly
          filteredPlants={filteredPlants}
          handleNewPlantDragStart={handleNewPlantDragStart}
        />

        {/* Added min-w-0 to prevent flexbox overflow issues */}
        <div className='flex-1 bg-white p-4 rounded-lg shadow-lg overflow-hidden min-w-0'>
          <GardenSizeControls
            gardenSize={gardenSize}
            handleSizeChange={handleSizeChange} // Pass the handler
          />
          {/* Added relative positioning & mt-4 */}
          <div className='relative mt-4' onClick={handleCanvasClick}>
            {/* Ensure GardenCanvas receives updated gardenPlants with warnings */}
            <GardenCanvas
              gardenSize={gardenSize}
              handleDrop={handleDrop}
              gardenPlants={gardenPlants}
              handlePlantClick={handlePlantClick}
              handlePlantDragStart={handlePlantDragStart}
              selectedPlantId={selectedPlant?.id}
            />
          </div>
        </div>

        <RightSidebar
          selectedPlant={selectedPlant} // Pass the full selected plant object
          onClose={handleCloseDetails}
          onDelete={handleDeletePlant} // Pass the correct handler
          // Optional: Pass these if needed in RightSidebar for displaying context/warnings
          // plantCompatibility={plantCompatibility}
          // allPlantsInGarden={gardenPlants}
        />
      </div>
    </div>
  )
}
