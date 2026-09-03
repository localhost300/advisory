'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdvisorMatch, QuestionnaireAnswers } from '@/types'
import { AdvisorCard } from '@/components/advisor-card'
import { Footer, Navbar } from '@/components/shell'
import { advisors } from '@/lib/data'
import { matchAdvisors } from '@/lib/matching'

const COOLDOWN_MS = 5 * 60 * 1000
const LAST_MATCH_KEY = 'advisoryrecord-last-match'
const MATCH_HISTORY_KEY = 'advisoryrecord-match-history'
const ANSWERS_KEY = 'noreva-answers'

function getHistory(): string[] {
  const stored = localStorage.getItem(MATCH_HISTORY_KEY)
  if (!stored) return []

  try {
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) && parsed.every((id): id is string => typeof id === 'string') ? parsed : []
  } catch {
    return []
  }
}

export default function Results() {
  const [answers, setAnswers] = useState<QuestionnaireAnswers | null>(null)
  const [advisor, setAdvisor] = useState<AdvisorMatch | null>(null)
  const [canMatch, setCanMatch] = useState(false)
  const [cooldownTime, setCooldownTime] = useState(0)

  useEffect(() => {
    const storedAnswers = localStorage.getItem(ANSWERS_KEY)
    if (!storedAnswers) return

    try {
      setAnswers(JSON.parse(storedAnswers) as QuestionnaireAnswers)
    } catch {
      setAnswers(null)
    }
  }, [])

  useEffect(() => {
    if (!answers) return

    const history = getHistory()
    let available = matchAdvisors(answers, advisors).filter((match) => !history.includes(match.id))

    if (!available.length) {
      localStorage.removeItem(MATCH_HISTORY_KEY)
      available = matchAdvisors(answers, advisors)
    }

    const nextAdvisor = available[0] ?? null
    setAdvisor(nextAdvisor)
    if (!nextAdvisor) return

    const nextHistory = [...history, nextAdvisor.id]
    localStorage.setItem(MATCH_HISTORY_KEY, JSON.stringify(nextHistory))

    const lastMatch = Number(localStorage.getItem(LAST_MATCH_KEY))
    const hasLastMatch = Number.isFinite(lastMatch) && lastMatch > 0
    const elapsed = hasLastMatch ? Date.now() - lastMatch : 0
    if (!hasLastMatch) localStorage.setItem(LAST_MATCH_KEY, Date.now().toString())
    if (elapsed >= COOLDOWN_MS) {
      setCanMatch(true)
      setCooldownTime(0)
    } else {
      setCanMatch(false)
      setCooldownTime(Math.ceil((COOLDOWN_MS - elapsed) / 1000))
    }
  }, [answers])

  useEffect(() => {
    if (canMatch || cooldownTime <= 0) return

    const timer = window.setInterval(() => {
      setCooldownTime((remaining) => {
        if (remaining <= 1) {
          setCanMatch(true)
          return 0
        }
        return remaining - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [canMatch, cooldownTime])

  const handleRematch = () => {
    if (!answers || !canMatch) return

    const history = getHistory()
    let available = matchAdvisors(answers, advisors).filter((match) => !history.includes(match.id))
    if (!available.length) {
      localStorage.removeItem(MATCH_HISTORY_KEY)
      available = matchAdvisors(answers, advisors)
    }

    const nextAdvisor = available[0] ?? null
    setAdvisor(nextAdvisor)
    if (!nextAdvisor) return

    localStorage.setItem(MATCH_HISTORY_KEY, JSON.stringify([...history, nextAdvisor.id]))
    localStorage.setItem(LAST_MATCH_KEY, Date.now().toString())
    setCanMatch(false)
    setCooldownTime(COOLDOWN_MS / 1000)
  }

  return (
    <>
      <Navbar />
      <main className="container py-14 md:py-20">
        <div className="max-w-2xl">
          <div className="eyebrow">Your result</div>
          <h1 className="display mt-3 text-5xl">Your advisor match</h1>
          <p className="mt-5 text-sm leading-6 text-gray-600">
            We selected the advisor who best aligns with your questionnaire answers. You can request another match every five minutes.
          </p>
        </div>

        {!canMatch && (
          <div className="mt-8 rounded border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-800">
              You can rematch in {Math.floor(cooldownTime / 60)}:{String(cooldownTime % 60).padStart(2, '0')}
            </p>
          </div>
        )}

        {advisor ? (
          <div className="mt-10">
            <AdvisorCard advisor={advisor} />
            <button disabled={!canMatch} onClick={handleRematch} className="btn btn-dark mt-6 disabled:cursor-not-allowed disabled:opacity-50">
              {canMatch ? 'Find Another Match' : 'Rematch Available Soon'}
            </button>
          </div>
        ) : (
          <div className="my-20 text-center">
            <h2 className="font-serif text-2xl">Complete the questionnaire to find an advisor.</h2>
            <Link href="/match" className="btn btn-dark mt-6 inline-flex">Start Matching</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
