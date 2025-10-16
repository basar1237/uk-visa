import React from 'react'
import Link from 'next/link'
import { 
  Globe, 
  Smartphone, 
  Clock, 
  Scale,
  FileText,
  CheckCircle,
  Home,
  Heart,
  Crown,
  Gavel,
  Briefcase,
  ShieldAlert,
  Plane,
  GraduationCap,
  Users,
  Building2,
  Mail,
  Lock,
  Star,
  Target,
  Shield,
  TrendingUp,
  Rocket,
  Zap,
  Award,
  ThumbsUp,
  CheckCircle2,
  Stamp,
  MapPin,
  Navigation,
  Compass,
  Map,
  Flag,
  Languages,
  BookOpen,
  FileCheck,
  UserCheck,
  BadgeCheck,
  ClipboardCheck,
  Receipt,
  Banknote,
  Wallet,
  CreditCard,
  Calendar,
  CalendarCheck,
  Timer,
  Hourglass,
  Sparkles,
  TrendingDown,
  BarChart,
  PieChart,
  Building,
  Landmark,
  University,
  type LucideIcon
} from 'lucide-react'

import type { ServicesGridBlock } from '@/payload-types'

const iconMap: Record<string, LucideIcon> = {
  // Temel İkonlar
  globe: Globe,
  phone: Smartphone,
  clock: Clock,
  scales: Scale,
  
  // Belge ve Döküman
  passport: FileText,
  document: CheckCircle,
  filetext: FileText,
  filecheck: FileCheck,
  stamp: Stamp,
  receipt: Receipt,
  clipboardcheck: ClipboardCheck,
  
  // Ev ve Aile
  house: Home,
  heart: Heart,
  users: Users,
  
  // Hukuk ve Adalet
  crown: Crown,
  justice: Gavel,
  
  // İş ve Kariyer
  briefcase: Briefcase,
  building: Building,
  building2: Building2,
  landmark: Landmark,
  university: University,
  
  // Seyahat ve Lokasyon
  plane: Plane,
  mappin: MapPin,
  navigation: Navigation,
  compass: Compass,
  map: Map,
  flag: Flag,
  
  // Eğitim
  graduation: GraduationCap,
  bookopen: BookOpen,
  
  // İletişim
  mail: Mail,
  
  // Güvenlik
  lock: Lock,
  shield: Shield,
  handcuffs: ShieldAlert,
  
  // Onay ve Başarı
  checkcircle: CheckCircle,
  checkcircle2: CheckCircle2,
  usercheck: UserCheck,
  badgecheck: BadgeCheck,
  thumbsup: ThumbsUp,
  star: Star,
  award: Award,
  
  // Hız ve İlerleme
  rocket: Rocket,
  zap: Zap,
  trending: TrendingUp,
  trendingdown: TrendingDown,
  target: Target,
  sparkles: Sparkles,
  
  // Finans
  banknote: Banknote,
  wallet: Wallet,
  creditcard: CreditCard,
  
  // Zaman
  calendar: Calendar,
  calendarcheck: CalendarCheck,
  timer: Timer,
  hourglass: Hourglass,
  
  // Analiz
  barchart: BarChart,
  piechart: PieChart,
  
  // Dil
  languages: Languages,
}

export const ServicesGridComponent: React.FC<ServicesGridBlock> = ({ title, services }) => {

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-blue-800 mb-5">
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services?.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FileText
            
            return (
              <div key={index} className="bg-white rounded-xl hover:bg-blue-50 border-gray-400 p-4 shadow-lg hover:shadow-xl hover:-translate-y-3 transition-all duration-300 cursor-pointer aspect-square flex flex-col justify-center">
                {service.buttonLink ? (
                  <Link href={service.buttonLink} className="h-full flex flex-col justify-center text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <IconComponent className="w-12 h-12 text-blue-800" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-600 mb-2">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-800  leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="h-full flex flex-col justify-center text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <IconComponent className="w-8 h-8 text-blue-800" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-600 mb-2">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
