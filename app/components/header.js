import Link from 'next/link';

const Header = () => {
    return (
      <div>
        <header className="flex justify-between items-center mb-16 p-6 px-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-purple-50 relative">
          {/* Logo */}
          <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg" />
            <span className="text-xl font-bold text-purple-900">Slotify</span>
          </div>
          </Link>
  
          {/* Navigation - Modified groups */}
          <nav className="flex gap-6 items-center">
            <div className="group relative inline-block self-start">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors">
                <span className="font-medium text-purple-900">Pricing</span>
                <svg
                  className="w-4 h-4 text-purple-500 transition-transform group-hover:rotate-180"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
  
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-purple-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 space-y-1">
                  <Link className="block px-4 py-3 hover:bg-purple-50 rounded-lg text-purple-800" href="/pricing">
                      Pricing Plans
                  </Link>
                </div>
              </div>
            </div>
  
            <div className="h-6 w-px bg-purple-100" />
  
            <div className="group relative inline-block self-start">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors">
                <span className="font-medium text-purple-900">About</span>
                <svg
                  className="w-4 h-4 text-purple-500 transition-transform group-hover:rotate-180"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
  
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-purple-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 space-y-1">
                  <Link className="block px-4 py-3 hover:bg-purple-50 rounded-lg text-purple-800" href="/about">
                      Our Story
                  </Link>
                </div>
              </div>
            </div>
  
            <div className="h-6 w-px bg-purple-100" />
  
            <div className="group relative inline-block self-start">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors">
                <span className="font-medium text-purple-900">Contact</span>
                <svg
                  className="w-4 h-4 text-purple-500 transition-transform group-hover:rotate-180"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
  
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-purple-100 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 space-y-1">
                  <Link className="block px-4 py-3 hover:bg-purple-50 rounded-lg text-purple-800" href="/contact">
                      Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </nav>
  
          {/* CTA */}
          <button className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-sm">
            Get Started
          </button>
        </header>
      </div>
    );
  };
  export default Header;