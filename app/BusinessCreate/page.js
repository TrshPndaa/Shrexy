'use client'
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Background from '../components/Background';
import Header from '../components/header';

export default function BusinessCreate() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    category: '',
    password: '' // Added password field
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      const { data, error: insertError } = await supabase
        .from('businesses')
        .insert([{
          name: formData.name,
          email: formData.email,
          description: formData.description,
          category: formData.category,
          created_at: new Date(),
          password: formData.password
        }])
        .select();

      if (insertError) throw insertError;
      
      setMessage({ type: 'success', text: 'Business created successfully!' });
      // Reset form
      setFormData({
        name: '',
        email: '',
        description: '',
        category: '',
        password: '' // Reset password field
      });
      
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <title>Slotic | Create Business</title>
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white overflow-hidden relative">
        <Background/>
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Welcome To Slotic
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-900 mb-12 max-w-2xl leading-relaxed">
              Fill out the form below to get started with your business on Slotic
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              {/* Form fields */}
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Business Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Business Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-black w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="description"
                  placeholder="Business Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="text-black w-full px-6 py-4 rounded-2xl border-2 border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                  rows="4"
                  required
                />
              </div>
              <div className="mb-6">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="text-black w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:outline-none focus:border-purple-400 transition-colors"
                  required
                >
                  <option value="" disabled>Select Business Category</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Medical">Medical</option>
                  <option value="Salon">Salon</option>
                  <option value="Spa">Spa</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Legal">Legal</option>
                  <option value="Therapy">Therapy</option>
                </select>
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
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
                {loading ? 'Creating...' : 'Create Business'}
              </button>
            </form>
        </div>
        </div>
      </main>
    </>
  );
}