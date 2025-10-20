import type { Metadata } from 'next'
import { EnglishTestComponent } from './EnglishTestComponent'

export const metadata: Metadata = {
  title: 'English Language Test | Free Online Assessment',
  description: 'Test your English language proficiency with our comprehensive online assessment. Get instant results and detailed feedback on your grammar, vocabulary, and language skills.',
  keywords: 'English test, language proficiency, grammar test, vocabulary test, English assessment, IELTS preparation, TOEFL preparation',
}

export default function EnglishTestPage() {
  return <EnglishTestComponent />
}