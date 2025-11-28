'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, UserCheck, MessageCircle, ArrowRight } from 'lucide-react'

export const VisaJourneyCTA = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your UK Visa Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of successful applicants who trusted us with their UK immigration journey. Let our expert team guide you to success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/eligibility-check"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 shadow-2xl hover:shadow-3xl"
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Free Eligibility Check
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700/30 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-blue-700/40"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <Phone className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-semibold mb-1">Call Us</div>
                  <a href="tel:01143214047" className="text-blue-100 hover:text-white text-sm">
                    01143214047
                  </a>
                </div>
                <div>
                  <Mail className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-semibold mb-1">Email Us</div>
                  <a href="mailto:info@ukimmigrationhelpline.com" className="text-blue-100 hover:text-white text-sm">
                    info@ukimmigrationhelpline.com
                  </a>
                </div>
                <div>
                  <MapPin className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                  <div className="text-white font-semibold mb-1">Visit Us</div>
                  <div className="text-blue-100 text-sm">Sheffield, United Kingdom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

