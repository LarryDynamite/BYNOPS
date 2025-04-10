import { useState } from 'react';
import BynopsLogo from '../assets/bynops-logo.png';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We\'ll be in touch soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200">
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Logo - Centered */}
        <div className="flex justify-center mb-12">
          <img 
            src={BynopsLogo}
            alt="Bynops Logo"
            className="h-16 object-contain"
          />
        </div>

        {/* Header Section */}
        <header className="mb-16 text-center bg-white rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The Workspace that Knows your Workflow, Jlo is amazing at coding but sucks at git
          </h1>
          
          <div className="mb-8">
            <p className="text-xl text-gray-700 mb-6">
              Bynops is assembling a dream team to bring faster, smarter loan servicing and asset management to life.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg transform hover:scale-105">
              Learn more
            </button>
          </div>
        </header>

        {/* Mission Section */}
        <section className="mb-16 bg-white rounded-xl p-8 shadow-lg">
          <p className="text-gray-700 mb-4">
            Inspired by firsthand experience, we're eager to bring much-needed innovation to the space.
          </p>
          <p className="text-gray-700">
            Bynops aims to modernize LSAM workflows, saving not only time, but also dollars.
          </p>
        </section>

        {/* Coming Soon Section */}
        <section className="mb-16 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Bynops is coming soon.</h2>
          <p className="text-gray-700 mb-8 text-center">
            We're building something new. Stay in the loop.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
              >
                Send
              </button>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="text-center mt-20 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <img 
              src={BynopsLogo}
              alt="Bynops Logo"
              className="h-12 object-contain"
            />
          </div>
          <p className="text-gray-600 font-medium">The Workspace that knows your workflow.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;