'use client'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import { ChartBarIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function PerformanceMetrics({ appointments, services }) {
  const totalRevenue = appointments.reduce((sum, apt) => sum + apt.services.price, 0)
  const avgServiceRating = 4.5 // Placeholder for actual rating calculation
  const clientRetention = 92 // Placeholder

  const metrics = [
    {
      id: 1,
      title: 'Total Appointments',
      value: appointments.length,
      icon: ChartBarIcon,
      trend: appointments.length > 0 ? 'up' : 'neutral'
    },
    {
      id: 2,
      title: 'Monthly Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      trend: 'up'
    },
    {
      id: 3,
      title: 'Avg. Service Rating',
      value: avgServiceRating,
      icon: UsersIcon,
      trend: 'up'
    },
    {
      id: 4,
      title: 'Client Retention',
      value: `${clientRetention}%`,
      icon: UsersIcon,
      trend: 'down'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
              <metric.icon className="h-6 w-6 text-current" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            {metric.trend === 'up' ? (
              <>
                <ArrowUpIcon className="h-4 w-4 text-green-600" />
                <span className="text-green-600 ml-1">12% vs last month</span>
              </>
            ) : metric.trend === 'down' ? (
              <>
                <ArrowDownIcon className="h-4 w-4 text-red-600" />
                <span className="text-red-600 ml-1">3% vs last month</span>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}