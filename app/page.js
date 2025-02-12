import Background from './components/Background';
import Header from './components/header';

export default function Home() {
  return (
    <>
    <title>Slotic | Home</title>
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
      {/* Background elements */}

        <Background/>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Hero section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            SLOTIC
          </h1>
          
          <p className="text-2xl md:text-3xl text-purple-900 mb-12 max-w-2xl leading-relaxed">
            Revolutionizing business-customer connections through intelligent scheduling solutions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <input
              type="email"
              placeholder="Enter your email to start"
              className="text-black flex-1 px-6 py-4 rounded-full border-2 border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <button className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg">
              Get Started Free
            </button>
          </div>
        </div>

        {/* Value proposition cards */}
        <div className="grid md:grid-cols-3 gap-8 my-24">
          {[
            { 
              title: 'Smart Scheduling', 
              text: 'AI-powered time optimization for maximum efficiency',
              color: 'from-purple-500 to-pink-400',
              emoji: '📅'
            },
            { 
              title: 'Real-Time Analytics', 
              text: 'Comprehensive insights into your booking ecosystem',
              color: 'from-pink-500 to-purple-400',
              emoji: '📈'
            },
            { 
              title: 'Secure Payments', 
              text: 'Integrated financial system with encrypted transactions',
              color: 'from-purple-600 to-pink-500',
              emoji: '🔒'
            }
          ].map((card, index) => (
            <div 
              key={card.title}
              className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-50"
            >
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-3xl`}>
                {card.emoji}
              </div>
              <h3 className="text-2xl font-bold text-purple-900 mb-4">{card.title}</h3>
              <p className="text-purple-700 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}