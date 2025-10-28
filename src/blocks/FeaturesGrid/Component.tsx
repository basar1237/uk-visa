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
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 my-10 text-center">
            {title}
          </h2>
        )}
        
        <div className="flex flex-nowrap justify-center gap-2 sm:gap-4 lg:gap-6 overflow-x-auto">
          {features?.map((feature, index) => {
            const IconComponent = feature.icon ? iconMap[feature.icon] : null
            const itemCount = features?.length || 0
            
            // Calculate responsive width based on item count - all items stay on same row
            let itemWidth = 'w-full'
            if (itemCount === 1) {
              itemWidth = 'w-full max-w-md flex-shrink-0'
            } else if (itemCount === 2) {
              itemWidth = 'w-[calc(50%-0.5rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1.5rem)] flex-shrink-0'
            } else if (itemCount === 3) {
              itemWidth = 'w-[calc(33.333%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex-shrink-0'
            } else if (itemCount === 4) {
              itemWidth = 'w-[calc(25%-0.5rem)] sm:w-[calc(25%-1rem)] lg:w-[calc(25%-1.5rem)] flex-shrink-0'
            } else if (itemCount === 5) {
              itemWidth = 'w-[calc(20%-0.5rem)] sm:w-[calc(20%-1rem)] lg:w-[calc(20%-1.5rem)] flex-shrink-0'
            }
            
            return (
              <div key={index} className={`${itemWidth} border hover:border-blue-200 transition-all duration-300 flex flex-col p-3 sm:p-4 lg:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl`}>
                {IconComponent && (
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="bg-blue-100 p-2 sm:p-3 lg:p-4 rounded-full">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-800" />
                    </div>
                  </div>
                )}
                
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-blue-800 mb-2 sm:mb-3 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-gray-800 text-xs sm:text-sm text-center flex-1">
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
