
import { Input } from "@/components/ui/input";

export default function GardenSizeControls({gardenSize, handleSizeChange}) {
return ( 
<div className="flex justify-center gap-4 mb-4">
<div className="flex items-center gap-2">
  <span className="font-medium">Height</span>
  <Input
    type="number"
    value={gardenSize.height}
    onChange={(e) => handleSizeChange("height", e.target.value)}
    className="w-20 text-center"
    min="5"
  />
  <span>ft</span>
</div>
<div className="flex items-center gap-2">
  <span className="font-medium">Width</span>
  <Input
    type="number"
    value={gardenSize.width}
    onChange={(e) => handleSizeChange("width", e.target.value)}
    className="w-20 text-center"
    min="5"
  />
  <span>ft</span>
</div>
</div> )
}