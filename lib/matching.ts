import { Advisor, AdvisorMatch, QuestionnaireAnswers } from '@/types'

export function matchAdvisors(a: QuestionnaireAnswers, list: Advisor[]): AdvisorMatch[] {
  return list.map((advisor) => {
    let points = 58
    const overlaps = advisor.specialties.filter((specialty) => a.specialties.includes(specialty))
    points += overlaps.length * 10
    if (a.goals.includes('Plan for retirement') && advisor.specialties.includes('Retirement')) points += 8
    if (a.goals.includes('Grow my wealth') && advisor.specialties.includes('Wealth Management')) points += 7
    if (advisor.communication.includes(a.communication as 'Email' | 'Phone')) points += 5
    if (a.approach === 'Hands-on' && advisor.years >= 12) points += 4
    const score = Math.min(96, points)
    return {
      ...advisor,
      score,
      reason: overlaps.length
        ? `Strong alignment in ${overlaps.slice(0, 2).join(' and ').toLowerCase()}.`
        : 'Broad alignment with your goals and communication preferences.',
    }
  }).sort((x, y) => y.score - x.score)
}
