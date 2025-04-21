// fetchUSDAData.ts
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
    return (await res.json()) as USDADataEntry;
  } catch (err) {
    console.warn(`USDA fetch failed for ${plantName}:`, err);
    return fallbackData[plantName.toUpperCase()] ?? null;
  }
}