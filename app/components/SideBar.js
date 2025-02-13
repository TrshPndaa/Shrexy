'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarIcon, ChartBarIcon, CogIcon, UserGroupIcon, ClipboardIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  const pathname = usePathname()
  
  const navigation = [
    { name: 'Calendar', href: '/dashboard', icon: CalendarIcon },
    { name: 'Appointments', href: '/appointments', icon: ClipboardIcon },
    { name: 'Clients', href: '/clients', icon: UserGroupIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg ${
              pathname === item.href
                ? 'bg-purple-50 text-purple-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}