// app/api/usda-prices/route.ts
import { NextResponse } from 'next/server'

const USDA_API_KEY = '51605E56-04A3-3098-8826-7256841F1C95'
const BASE_URL = 'https://quickstats.nass.usda.gov/api/api_GET'

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const plant = searchParams.get('plant')?.toUpperCase()

  if (!plant) {
    return NextResponse.json({ error: 'No plant provided' }, { status: 400 })
  }

  // build USDA QuickStats query
  const params = new URLSearchParams({
    key: USDA_API_KEY,
    commodity_desc: plant,
    year: '2023',
    statisticcat_desc: 'PRICE RECEIVED',
    agg_level_desc: 'NATIONAL',
    format: 'JSON'
  })

  try {
    // server‑side fetch avoids CORS
    const res = await fetch(`${BASE_URL}?${params.toString()}`)
    if (!res.ok) {
      throw new Error(`USDA responded ${res.status}`)
    }

    const json = await res.json()
    const rows = json.data || []

    // if no data, return 204 so client can fallback
    if (!rows.length) {
      return NextResponse.json({}, { status: 204 })
    }

    // parse and average
    const prices = rows
      .map((r: any) => parseFloat(r.Value.replace(',', '')))
      .filter((n: number) => !isNaN(n))
    if (!prices.length) {
      return NextResponse.json({}, { status: 204 })
    }

    const avg = prices.reduce((a, b) => a + b, 0) / prices.length
    const unit = rows[0].unit_desc.substring(4) || 'CWT'

    return NextResponse.json({
      PRICE_WHOLESALE: parseFloat(avg.toFixed(2)),
      PRICE_GROWN: parseFloat((avg * 0.25).toFixed(2)),
      AMOUNT_TYPE: unit
    })
  } catch (err) {
    console.error('USDA proxy error:', err)
    return NextResponse.json({}, { status: 502 })
  }
}
