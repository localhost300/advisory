import './globals.css';import {Manrope,Newsreader} from 'next/font/google';import type {Metadata} from 'next'
const manrope=Manrope({subsets:['latin'],variable:'--font-manrope'});const newsreader=Newsreader({subsets:['latin'],variable:'--font-newsreader'})
export const metadata:Metadata={title:'AdvisoryRecord — Financial advisor matching',description:'Find financial guidance that fits your goals and preferences.'}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${manrope.variable} ${newsreader.variable} font-sans`}>{children}</body></html>}
