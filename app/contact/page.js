import Background from '../components/Background';
import Header from '../components/header';

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
      {/* Reusable background elements */}
        <Background/>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-purple-50">
            <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-purple-700 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-purple-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  placeholder="hello@company.com"
                />
              </div>
              
              <div>
                <label className="block text-purple-700 mb-2 font-medium">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Other Ways to Connect</h3>
              <div className="grid grid-cols-2 gap-4 text-purple-700">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.7 0 6 2.7 6 6c0 1.2.4 2.3 1 3.2l5 7 5-7c.6-.9 1-2 1-3.2 0-3.3-2.7-6-6-6zm0 16c-5.5 0-10 4.5-10 10h20c0-5.5-4.5-10-10-10z"/>
                  </svg>
                  123 Business Rd, Tech City
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  support@slotic.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}