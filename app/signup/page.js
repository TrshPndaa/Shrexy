'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient'
import Link from 'next/link';
import Background from '../components/Background';
import Header from '../components/header';

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Step 1: Sign up the user
            const { data: { user }, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: `${location.origin}/auth/callback` }
            });

            if (authError) throw authError;

            // Step 2: Wait for user to be fully created
            let retries = 0;
            let userExists = false;
            while (retries < 5 && !userExists) {
                const { data: { user: verifiedUser } } = await supabase.auth.getUser();
                if (verifiedUser?.id === user?.id) {
                    userExists = true;
                } else {
                    await new Promise(resolve => setTimeout(resolve, 500)); // Wait 0.5s
                    retries++;
                }
            }

            if (!userExists) throw new Error("User creation timed out");

            // Step 3: Create business profile
            const { error: businessError } = await supabase
                .from('businesses')
                .insert([{
                    owner_id: user.id, // Use the confirmed user ID
                    business_name: 'My Business',
                    contact_email: email
                }]);

            if (businessError) throw businessError;

            router.push('/business-setup');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
            <Background/>
            <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-purple-50">
                        <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        
                        {error && (
                            <div className="text-red-500 text-sm mb-4">{error}</div>
                        )}

                        <form onSubmit={handleSignUp} className="space-y-6">
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
                                    minLength="6"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>

                            <div className="text-center text-purple-700">
                                Already have an account?{' '}
                                <Link href="/signin" className="text-purple-600 hover:underline">
                                    Log in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}