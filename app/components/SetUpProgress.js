'use client'
import { CheckIcon } from '@heroicons/react/20/solid'

export default function SetupProgress({ steps, currentStep }) {
  return (
    <nav className="flex items-center justify-center" aria-label="Progress">
      <ol className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center">
            {/* Step connector */}
            {index > 0 && (
              <div className={`h-0.5 w-8 ${index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'}`} />
            )}

            {/* Step content */}
            <div className="relative flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center 
                  ${index < currentStep ? 'bg-purple-600' : ''}
                  ${index === currentStep ? 'ring-2 ring-purple-600' : 'bg-gray-200'}
                `}
              >
                {index < currentStep ? (
                  <CheckIcon className="h-5 w-5 text-white" />
                ) : (
                  <span className={`text-sm ${index === currentStep ? 'text-purple-600' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium 
                ${index <= currentStep ? 'text-purple-600' : 'text-gray-500'}
              `}>
                {step}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}