import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'เขื่อนและเขาในสายหมอก | LLLDO 2569', description: 'แบบฟอร์มลงทะเบียนสัมมนา LLLDO 2569' }
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}