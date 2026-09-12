import { NextResponse } from 'next/server'

const instruments = [
  { symbol: '^GSPC', label: 'S&P 500' },
  { symbol: '^IXIC', label: 'NASDAQ' },
  { symbol: '^DJI', label: 'DOW JONES' },
  { symbol: 'GC=F', label: 'GOLD' },
  { symbol: 'BTC-USD', label: 'BITCOIN' },
]

type YahooChartResponse = {
  chart?: { result?: Array<{ meta?: { regularMarketPrice?: number; regularMarketChangePercent?: number } }> }
}

export async function GET() {
  const markets = await Promise.all(instruments.map(async ({ symbol, label }) => {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d`,
        { headers: { Accept: 'application/json' }, next: { revalidate: 300 } },
      )
      if (!response.ok) return null
      const data = (await response.json()) as YahooChartResponse
      const meta = data.chart?.result?.[0]?.meta
      return meta?.regularMarketPrice === undefined || meta.regularMarketChangePercent === undefined
        ? null
        : { symbol: label, value: meta.regularMarketPrice, change: meta.regularMarketChangePercent }
    } catch {
      return null
    }
  }))

  return NextResponse.json(
    { markets: markets.filter((market) => market !== null), updatedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
  )
}
