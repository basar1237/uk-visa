'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileText } from 'lucide-react'

const EligibilitySubmissionExportField: React.FC = () => {
  const handleExport = async (format: 'csv' | 'json') => {
    try {
      // URL'den ID'yi al
      const pathParts = window.location.pathname.split('/')
      const id = pathParts[pathParts.length - 1]
      
      const response = await fetch(`/api/eligibility-submissions?format=${format}&id=${id}`)
      
      if (format === 'csv') {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `eligibility-submission-${id}-${new Date().toISOString().split('T')[0]}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `eligibility-submission-${id}-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Export işlemi sırasında hata oluştu')
    }
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-green-900">Download This Record</h3>
        <p className="text-sm text-green-700">
          You can download this eligibility submission in CSV or JSON format
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport('csv')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </Button>
          <Button
            onClick={() => handleExport('json')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50"
          >
            <FileText className="w-4 h-4" />
            Download JSON
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EligibilitySubmissionExportField
