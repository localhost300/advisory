import { NextResponse } from 'next/server'
import { advisors } from '@/lib/data'

export async function POST(request: Request) {
  const body = await request.json() as {
    advisorId?: string
    name?: string
    email?: string
    phone?: string
    method?: string
    date?: string
    time?: string
    message?: string
  }

  const advisor = advisors.find((item) => item.id === body.advisorId)
  if (!advisor || !body.name || !body.email || !body.method) {
    return NextResponse.json({ error: 'Please provide the required contact details.' }, { status: 400 })
  }

  console.info('Advisor contact request received', {
    advisor: advisor.name,
    recipient: advisor.email,
    ...body,
  })

  return NextResponse.json({ success: true })
}
