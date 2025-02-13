'use client'



import Header from '../components/header.js'
import Sidebar from '../components/SideBar.js'


export default function DashboardLayout({ children, business }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header business={business} />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}