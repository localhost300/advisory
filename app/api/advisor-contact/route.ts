import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { advisors } from '@/lib/data'

export const runtime = 'nodejs'

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

  const smtpUser = process.env.HOSTINGER_SMTP_USER
  const smtpPassword = process.env.HOSTINGER_SMTP_PASSWORD
  if (!smtpUser || !smtpPassword) {
    console.error('Hostinger SMTP credentials are not configured.')
    return NextResponse.json({ error: 'Email delivery is not configured.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.HOSTINGER_SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.HOSTINGER_SMTP_PORT || 465),
    secure: (process.env.HOSTINGER_SMTP_PORT || '465') === '465',
    auth: { user: smtpUser, pass: smtpPassword },
  })

  const details = [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone || 'Not provided'}`,
    `Preferred contact method: ${body.method}`,
    `Preferred date: ${body.date || 'Not provided'}`,
    `Preferred time: ${body.time || 'Not provided'}`,
    '',
    'Message:',
    body.message || 'No message provided.',
  ].join('\n')

  try {
    await transporter.sendMail({
      from: `AdvisoryRecord <${smtpUser}>`,
      to: advisor.email,
      replyTo: body.email,
      subject: `New introduction request from ${body.name}`,
      text: details,
    })
  } catch (error) {
    console.error('Unable to deliver advisor contact request', error)
    return NextResponse.json({ error: 'Unable to send your request. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
