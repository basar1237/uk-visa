import React from 'react'
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

import type { FeaturesGridBlock } from '@/payload-types'

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

export const FeaturesGridComponent: React.FC<FeaturesGridBlock> = ({ title, features }) => {

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {title && (
           <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-6">
            {title}
          </h2>
        )}
        
        <div className="flex flex-nowrap gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-2 md:pb-0">
          {features?.map((feature, index) => {
            const IconComponent = feature.icon ? iconMap[feature.icon] : null
            const isUKImmigrationHelpline = feature.title?.toLowerCase().includes('uk immigration helpline') || feature.description?.toLowerCase().includes('uk immigration helpline')
            
            return (
              <div 
                key={index} 
                className={`min-w-[280px] md:min-w-0 md:flex-1 transition-all duration-300 flex flex-col p-4 md:p-5 lg:p-6 rounded-xl shadow-lg hover:shadow-xl flex-shrink-0 ${
                  isUKImmigrationHelpline 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-2 border-blue-700 hover:border-blue-500' 
                    : 'bg-white border hover:border-blue-200'
                }`}
              >
                {IconComponent && (
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className={`p-2 sm:p-3 lg:p-4 rounded-full ${
                      isUKImmigrationHelpline ? 'bg-white/20' : 'bg-blue-100'
                    }`}>
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${
                        isUKImmigrationHelpline ? 'text-white' : 'text-blue-800'
                      }`} />
                    </div>
                  </div>
                )}
                
                <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-center ${
                  isUKImmigrationHelpline ? 'text-white' : 'text-blue-800'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-xs sm:text-sm text-center flex-1 ${
                  isUKImmigrationHelpline ? 'text-white/90' : 'text-gray-800'
                }`}>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
