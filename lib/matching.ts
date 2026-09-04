import { Advisor, AdvisorMatch, QuestionnaireAnswers } from '@/types'

export function matchAdvisors(a: QuestionnaireAnswers, list: Advisor[]): AdvisorMatch[] {
  return list.map((advisor) => {
    const overlaps = advisor.specialties.filter((specialty) => a.specialties.includes(specialty))
    const specialtyScore = a.specialties.length ? (overlaps.length / a.specialties.length) * 40 : 0
    const goalScore = [
      ['Plan for retirement', 'Retirement'],
      ['Grow my wealth', 'Wealth Management'],
    ].reduce((score, [goal, specialty]) => score + (a.goals.includes(goal) && advisor.specialties.includes(specialty as Advisor['specialties'][number]) ? 10 : 0), 0)
    const experienceScore = a.experience === 'Advanced' && advisor.years >= 20
      ? 15
      : a.experience === 'Experienced' && advisor.years >= 10
        ? 15
        : a.experience === 'Some experience' && advisor.years >= 5
          ? 15
          : a.experience === 'New to investing' && advisor.years < 10
            ? 15
            : 0
    const approachScore = a.approach === 'Hands-on' && advisor.years >= 12
      ? 15
      : a.approach === 'Collaborative'
        ? 10
        : a.approach === 'Mostly independent'
          ? 5
          : 0
    const communicationScore = a.communication && advisor.communication.includes(a.communication as 'Email' | 'Phone') ? 10 : 0
    const score = Math.round(specialtyScore + goalScore + experienceScore + approachScore + communicationScore)
    return {
      ...advisor,
      score,
      reason: overlaps.length
        ? `Strong alignment in ${overlaps.slice(0, 2).join(' and ').toLowerCase()} based on your answers.`
        : 'Review this profile to see how it fits your answers and priorities.',
    }
  }).sort((x, y) => y.score - x.score)
}
