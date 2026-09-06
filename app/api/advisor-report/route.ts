import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json() as {
    advisor?: string
    issue?: string
    details?: string
    email?: string
  }

  if (!body.advisor || !body.issue || !body.details || body.details.trim().length < 20) {
    return NextResponse.json({ error: 'Please provide the advisor, issue type, and at least 20 characters of detail.' }, { status: 400 })
  }

  if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json({ error: 'Please provide a valid email address or leave it blank.' }, { status: 400 })
  }

  console.info('Advisor report received', body)
  return NextResponse.json({ success: true })
}
