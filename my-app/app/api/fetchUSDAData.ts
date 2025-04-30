// fetchUSDAData.ts

//Fetches data from USDAData.ts and sends it to the API with assistance from route.ts, 
// if API is unsuccessful it will resort to USDAData.ts
import { USDAData as fallbackData } from './fetchUSDA/USDAData';

export type USDADataEntry = {
  PRICE_WHOLESALE: number;
  PRICE_GROWN: number;
  AMOUNT_TYPE: string;
};

export async function fetchUSDAData(plantName: string): Promise<USDADataEntry | null> {
  try {
    const res = await fetch(`/api/fetchUSDA?plant=${encodeURIComponent(plantName)}`);
    if (res.status === 204) {
      // no data returned → fall back
      return fallbackData[plantName.toUpperCase()] ?? null;
    }
    if (!res.ok) {
      throw new Error(`status ${res.status}`);
    }
    console.log(`USDA fetch successful for ${plantName}`); //Successful API fetch
    return (await res.json()) as USDADataEntry;
  } catch (err) {
    console.warn(`USDA fetch failed for ${plantName}:`, err); //Failed API fetch
    return fallbackData[plantName.toUpperCase()] ?? null;
  }
}