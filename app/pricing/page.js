import Header from '../components/header';
import Background from '../components/Background';

export default function Pricing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
      {/* Reusable background elements */}
        <Background/>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-xl text-purple-700 max-w-2xl mx-auto">
              Choose the plan that works best for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 w-full max-w-8xl">
            {[
              { 
                name: 'Starter',
                price: '12.99',
                features: ['5 Team Members', 'Basic Scheduling', '100 Monthly Bookings', 'Email Support'],
                color: 'from-purple-400 to-pink-300'
              },
              { 
                name: 'Professional',
                price: '24.99',
                features: ['15 Team Members', 'Advanced Analytics', 'Unlimited Bookings', 'Priority Support', 'API Access'],
                color: 'from-purple-600 to-pink-500',
                popular: true
              },
              { 
                name: 'Enterprise',
                price: 'Custom',
                features: ['Unlimited Team Members', 'Dedicated Support', 'Custom Integrations', 'SLA Agreement', 'Premium Security'],
                color: 'from-purple-700 to-pink-600'
              },
              {
                name: 'Free',
                price: '0',
                features: ['1 Team Member', 'Basic Scheduling', '25 Monthly Bookings', 'Community Support'],
                color: 'from-purple-600 to-pink-500',

              }
            ].map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative p-8 bg-white rounded-3xl shadow-xl border-2 ${
                  plan.popular ? 'border-purple-500' : 'border-purple-100'
                } transition-transform hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-3xl text-sm">
                    Most Popular
                  </div>
                )}
                <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${plan.color}`}>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="text-4xl font-black text-white mt-2">
                    ${plan.price}<span className="text-lg font-medium">/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-purple-700">
                      <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}