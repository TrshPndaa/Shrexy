'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../utils/supabaseClient'
import SetupProgress from '../components/SetUpProgress'

const steps = ['Business Info', 'Services', 'Availability', 'Payment']

export default function BusinessSetup() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: '',
        contactEmail: '',
        services: [],
        operatingHours: {}
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        setLoading(true)
        try {
            console.log('Fetching user...')
            const { data: { user } } = await supabase.auth.getUser()
            console.log('User fetched:', user)
            
            // Create business
            console.log('Creating business...')
            const { data: business, error } = await supabase
                .from('businesses')
                .insert([{
                    owner_id: user.id,
                    business_name: formData.businessName,
                    business_type: formData.businessType,
                    contact_email: formData.contactEmail,
                    operating_hours: formData.operatingHours
                }])
                .select()
                .single()
            console.log('Business created:', business)

            if (error) throw error

            // Create services
            console.log('Creating services...')
            const { error: servicesError } = await supabase
                .from('services')
                .insert(formData.services.map(service => ({
                    ...service,
                    business_id: business.id
                })))
            console.log('Services created')

            if (servicesError) throw servicesError

            router.push('/dashboard')
        } catch (error) {
            console.error('Setup failed:', error)
            alert(`Setup failed: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const renderStep = () => {
        switch(currentStep) {
            case 0:
                return (
                    <BusinessInfoStep 
                        data={formData}
                        onChange={(update) => setFormData(prev => ({...prev, ...update}))}
                    />
                )
            case 1:
                return (
                    <ServicesStep
                        services={formData.services}
                        onChange={(services) => setFormData(prev => ({...prev, services}))}
                    />
                )
            case 2:
                return (
                    <AvailabilityStep
                        hours={formData.operatingHours}
                        onChange={(operatingHours) => setFormData(prev => ({...prev, operatingHours}))}
                    />
                )
            case 3:
                return <PaymentStep data={formData} />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto py-12 px-4"></div>
                <SetupProgress steps={steps} currentStep={currentStep} />
                
                <div className="mt-8 bg-white p-8 rounded-xl shadow-sm">
                    {renderStep()}

                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
                            disabled={currentStep === 0}
                            className="btn-secondary"
                        >
                            Back
                        </button>
                        
                        {currentStep < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                className="btn-primary"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="btn-primary"
                            >
                                {loading ? 'Completing Setup...' : 'Complete Setup'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
    )
}