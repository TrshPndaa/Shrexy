'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import Background from '../components/Background';
import Header from '../components/header';

export default function BusinessLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;

            setMessage({ type: 'success', text: 'Logged in successfully!' });
            router.push('/dashboard');
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <title>Slotic | Business Login</title>
            <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
                <Background />
                <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
                    <Header />
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Business Login
                        </h1>

                        <form onSubmit={handleSubmit} className="w-full max-w-lg">
                            <div className="mb-6">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Business Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-black w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-black w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                                    required
                                />
                            </div>

                            {message && (
                                <div className={`mb-4 p-4 rounded-full ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {message.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}