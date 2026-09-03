'use client'
import { TrendingUp, TrendingDown, DollarSign, Zap, Gem, Bitcoin } from 'lucide-react'

const markets=[
  {symbol:'S&P 500',value:'6,415.54',change:'+0.41%',icon:TrendingUp},
  {symbol:'NASDAQ',value:'21,455.55',change:'+0.62%',icon:Zap},
  {symbol:'DOW JONES',value:'45,544.88',change:'−0.20%',icon:DollarSign},
  {symbol:'GOLD',value:'3,476.20',change:'+0.86%',icon:Gem},
  {symbol:'BITCOIN',value:'108,214',change:'−0.34%',icon:Bitcoin}
]

export function Spark({down=false}:{down?:boolean}){
  return <svg viewBox="0 0 100 26" className="h-7 w-24" aria-hidden>
    <path d={down?'M2 7 C20 4 20 18 36 13 S58 10 68 17 S84 21 98 15':'M2 20 C17 19 20 8 34 13 S52 18 62 9 S83 16 98 4'} fill="none" stroke={down?'#ef4444':'#10b981'} strokeWidth="2"/>
  </svg>
}

export function MarketStrip(){
  return <div className="overflow-x-auto pb-2">
    <div className="flex min-w-max divide-x divide-green-200 border-y border-green-200 bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900">
      {markets.map((m)=>{
        const isPositive = m.change[0]==='+';
        const IconComponent = m.icon;
        return <div key={m.symbol} className="flex w-[240px] items-center justify-between px-6 py-5 hover:bg-green-900/50 transition-colors">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <IconComponent size={14} className={isPositive ? 'text-green-400' : 'text-red-400'} />
              <span className="text-[10px] font-bold tracking-widest text-green-300 uppercase">{m.symbol}</span>
            </div>
            <div className="mt-1 text-base font-bold text-white font-mono">{m.value}</div>
            <div className={`ml-0 mt-2 text-[11px] font-semibold ${isPositive?'text-green-400':'text-red-400'}`}>
              {m.change}
            </div>
          </div>
          <Spark down={!isPositive}/>
        </div>
      })}
    </div>
  </div>
}
