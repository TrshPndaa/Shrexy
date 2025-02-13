'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../utils/supabaseClient'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'

export default function NewAppointment() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    serviceId: '',
    appointmentTime: new Date()
  })
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchServices = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .eq('business_id', business.id)

      setServices(servicesData || [])
    }

    fetchServices()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .eq('owner_id', user.id)
        .single()

      const { error } = await supabase
        .from('appointments')
        .insert([{
          ...formData,
          business_id: business.id,
          appointment_time: formData.appointmentTime.toISOString()
        }])

      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      alert(`Appointment creation failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">New Appointment</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Client Name</label>
          <input
            type="text"
            required
            className="input-field"
            value={formData.clientName}
            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Client Phone</label>
          <input
            type="tel"
            required
            className="input-field"
            value={formData.clientPhone}
            onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Service</label>
          <select
            required
            className="input-field"
            value={formData.serviceId}
            onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.service_name} (${service.price})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date & Time</label>
          <DateTimePicker
            onChange={(date) => setFormData({...formData, appointmentTime: date})}
            value={formData.appointmentTime}
            minDate={new Date()}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Creating...' : 'Create Appointment'}
        </button>
      </form>
    </div>
  )
}