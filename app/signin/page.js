'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { supabase } from '../utils/supabaseClient'
import Link from 'next/link';
import Background from '../components/Background';
import Header from '../components/header';

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter(); // Updated usage

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
      {/* Background elements */}
        <Background/>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-purple-50">
            <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Sign In
            </h2>
            
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block text-purple-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-purple-700 mb-2 font-medium">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>

              <div className="text-center text-purple-700">
                Don't have an account?{' '}
                <Link href="/signup" className="text-purple-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
