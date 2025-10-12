import type { Metadata } from 'next'

import { QuickRecommendationForm } from '@/components/QuickRecommendationForm'
import {
  FileText,
  Users,
  Briefcase,
  Plane,
  Building,
  Globe,
  Laptop,
  Star,
} from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'UK Immigration Service | Professional Visa Advice',
    description: 'Professional UK Immigration Service and Advice. 7 day visa service by immigration lawyers and advisors. Contact us for expert immigration assistance.',
  }
}

const services = [
  { icon: FileText, title: 'Visa Extension', color: 'violet' },
  { icon: Users, title: 'Spouse Visa', color: 'grape' },
  { icon: Users, title: 'Settlement Visa', color: 'indigo' },
  { icon: Briefcase, title: 'Work Visa', color: 'blue' },
  { icon: Plane, title: 'Travel', color: 'cyan' },
  { icon: Building, title: 'Family Visa', color: 'teal' },
  { icon: Globe, title: 'Global', color: 'green' },
  { icon: Laptop, title: 'Online', color: 'lime' },
]

const reviews = [
  {
    stars: 5,
    text: 'Excellent service! They helped me get my visa approved in just 7 days. Highly professional team.',
    author: 'Sarah M.',
  },
  {
    stars: 5,
    text: 'Very knowledgeable and supportive throughout the entire process. Would definitely recommend!',
    author: 'John D.',
  },
  {
    stars: 5,
    text: 'Fast, efficient and affordable. Best immigration solicitors in London!',
    author: 'Emma W.',
  },
]

export default async function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="bg-[#4A3B7A] text-white py-20 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/uk-hero-main.webp')" }}
      >
        <div className="absolute inset-0 bg-[#4A3B7A]/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-block w-fit">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-lg text-lg font-semibold">
                  UK&apos;s Only 7 Day Visa Service
                </span>
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                Professional UK Immigration Service
              </h1>

              <p className="text-lg opacity-90">
                CHomeVisa UK&apos;s Only 7 Day service is the fast-track Uk Visa Service chosen by
                Europeans from Australia, Austria, Canada, France, Germany, Ireland, Italy, the
                Netherlands, Spain, Poland, Portugal, South Africa, Sweden and USA. With
                applications to the UK Home Office starting at £1,500 + VAT and a same or next day
                application to the UK Home Office, our specialists are on the UK Home Office
                official list of Immigration lawyers appointed to the UK board. Entry out peace of
                mind.
              </p>

              <div className="flex gap-6">
                <div className="bg-white p-5 rounded-lg text-[#4A3B7A]">
                  <div className="space-y-1 text-sm font-semibold">
                    <p>📍 UK Immigration</p>
                    <p>📞 0203 633 4653</p>
                    <p>📧 UK National Office</p>
                    <p>📧 International Office</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    ⭐ 5.0 Excellent
                  </span>
                  <br />
                  <span className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    7 Years On Trustpilot
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Eligibility Test */}
            <div className="flex items-center justify-center">
              <QuickRecommendationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Professional Service Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">
              Professional UK Immigration Service{' '}
              <span className="text-purple-600">and Advice</span>
            </h2>
            <p className="text-gray-600 text-base max-w-4xl mx-auto">
              Immigration Advice UK is a professional immigration advisory that provides UK
              Immigration Advice and also recommends services. We are immigration advisors that can
              be trusted with your immigration needs. On my.uk.advice/immigration, we invite you to
              visit our immigration website. With the most comprehensive and easy access to our
              experts about immigration from, we&apos;re no doubt the smartest solution when it comes to
              dealing with all your immigration concerns. We&apos;ll give you the best advice along with
              good market-leading UK prices, so contact us today for a free assessment to see how
              we can assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="bg-purple-100 text-purple-600 p-4 rounded-lg">
                    <service.icon size={30} />
                  </div>
                  <p className="font-semibold">{service.title}</p>
                  <button className="w-full bg-purple-600 text-white py-1.5 rounded text-sm hover:bg-purple-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accredited Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-8 text-center">
            <h2 className="text-4xl font-bold">
              Our Immigration Lawyers Services are Accredited and Regulated Professionals
            </h2>

            <p className="text-gray-600 max-w-4xl mx-auto">
              Giving you peace of mind; this the best solicitors in the UK are specialist
              immigration advisors, we deal with overseas nationals immigration, as regulated
              solicitors according to customer via a free initial customer services. We will not be
              asked for deposit until you are happy and confident with the level of legal service
              we will provide you with. So what happens after you contact an immigration lawyer,
              proof that our immigration facilities have been trusted and meet many other
              professional standards at all immigration law.
            </p>

            <hr className="border-gray-200" />

            <div className="space-y-6">
              <p className="text-lg font-semibold">
                Discuss the options available when you call us:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Appointments available, including free on-line',
                  'Central offices in London-Manchester-Kent-Birmingham',
                  'Immigration/Legislation followers',
                  'Fixed fees budget options',
                  'Flexible payment plans',
                  'Expert legal advice',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-4 text-center"
                  >
                    <p className="text-sm">✓ {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} size={20} fill="orange" color="orange" />
                    ))}
                  </div>
                  <p className="text-sm">{review.text}</p>
                  <p className="text-sm font-semibold text-gray-500">— {review.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#4A3B7A] text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Speak to us now on</h2>
              <h1 className="text-5xl font-bold text-orange-500 mb-2">0203 633 4653</h1>
              <p className="text-lg">or request a call back.</p>
            </div>

            <div className="bg-white rounded-lg p-8 text-gray-900">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-purple-900 transition-all"
                >
                  Call me back
                </button>
                <p className="text-xs text-center text-gray-500">
                  All information you provide is held under our Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-gray-500 mb-6">As featured in:</p>
          <div className="flex justify-center gap-12">
            <p className="text-gray-500 font-semibold">The Telegraph</p>
            <p className="text-gray-500 font-semibold">Daily Mail</p>
            <p className="text-gray-500 font-semibold">UK Times</p>
          </div>
        </div>
      </section>
    </div>
  )
}

