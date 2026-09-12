'use client'

import { useEffect, useState } from 'react'
import { Bitcoin, DollarSign, Gem, TrendingUp, Zap } from 'lucide-react'

type Market = { symbol: string; value: number; change: number }

const icons = { 'S&P 500': TrendingUp, NASDAQ: Zap, 'DOW JONES': DollarSign, GOLD: Gem, BITCOIN: Bitcoin }

export function Spark({ down = false }: { down?: boolean }) {
  return <svg viewBox="0 0 100 26" className="h-7 w-24" aria-hidden>
    <path d={down ? 'M2 7 C20 4 20 18 36 13 S58 10 68 17 S84 21 98 15' : 'M2 20 C17 19 20 8 34 13 S52 18 62 9 S83 16 98 4'} fill="none" stroke={down ? '#ef4444' : '#10b981'} strokeWidth="2" />
  </svg>
}

export function MarketStrip() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/market-data')
      .then((response) => {
        if (!response.ok) throw new Error('Market data unavailable')
        return response.json()
      })
      .then((data: { markets?: Market[] }) => setMarkets(data.markets ?? []))
      .catch(() => setMarkets([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="h-[104px] animate-pulse border-y border-green-200 bg-slate-900" aria-label="Loading live market data" />
  if (!markets.length) return <p className="border-y border-gray-200 py-8 text-sm text-gray-500">Live market data is currently unavailable. Please try again shortly.</p>

  return <div className="overflow-x-auto pb-2">
    <div className="flex min-w-max divide-x divide-green-200 border-y border-green-200 bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900">
      {markets.map((market) => {
        const isPositive = market.change >= 0
        const Icon = icons[market.symbol as keyof typeof icons] ?? TrendingUp
        return <div key={market.symbol} className="flex w-[240px] items-center justify-between px-6 py-5 transition-colors hover:bg-green-900/50">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Icon size={14} className={isPositive ? 'text-green-400' : 'text-red-400'} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-300">{market.symbol}</span>
            </div>
            <div className="mt-1 font-mono text-base font-bold text-white">{market.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
            <div className={`mt-2 text-[11px] font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : '−'}{Math.abs(market.change).toFixed(2)}%
            </div>
          </div>
          <Spark down={!isPositive} />
        </div>
      })}
    </div>
  </div>
}
