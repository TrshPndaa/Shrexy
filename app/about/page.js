import Header from '../components/header';
import Background from '../components/Background';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
      {/* Background elements */}
        <Background/>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col justify-center">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-lg text-purple-700 leading-relaxed">
                Founded in 2023, Slotify emerged from a simple idea: scheduling should be smart, simple, and secure.
                Our team of passionate developers and customer experience experts came together to revolutionize
                how businesses connect with their clients.
              </p>
              <div className="p-6 bg-white rounded-2xl shadow-lg border border-purple-50">
                <h3 className="text-2xl font-bold text-purple-900 mb-3">Core Values</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>✅ Customer-centric innovation</li>
                  <li>✅ Transparent operations</li>
                  <li>✅ Security first approach</li>
                  <li>✅ Continuous improvement</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { img: '/team1.jpg', name: 'Alex Chen', role: 'CEO' },
                { img: '/team2.jpg', name: 'Maria Gomez', role: 'CTO' },
                { img: '/team3.jpg', name: 'James Wilson', role: 'Head of Design' },
                { img: '/team4.jpg', name: 'Sarah Kim', role: 'Customer Success' }
              ].map((member, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-purple-900 to-transparent">
                    <h4 className="text-white font-semibold">{member.name}</h4>
                    <p className="text-purple-200 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}