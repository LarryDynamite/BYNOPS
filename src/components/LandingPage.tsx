import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import BynopsLogo from '../assets/bynops-logo.png';
import Favicon from '../assets/favicon.ico';
import SocialBanner from '../assets/social-banner.jpg';

const LinkedInLogo = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="#0A66C2" 
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2"
  >
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
  </svg>
);

const LandingPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const generateEmailTemplate = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BYNOPS Confirmation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .email-container {
          border: 4px solid transparent;
          border-image: linear-gradient(to right, #f97316, #3b82f6);
          border-image-slice: 1;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(to right, #f97316, #3b82f6);
          padding: 25px;
          text-align: center;
          color: white;
        }
        .gradient-text {
          background: linear-gradient(to right, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
          font-size: 28px;
          font-weight: bold;
          margin: 10px 0;
        }
        .content {
          background-color: white;
          padding: 25px;
        }
        .footer {
          margin-top: 25px;
          font-size: 12px;
          color: #64748b;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }
        .button {
          background: linear-gradient(to right, #f97316, #3b82f6);
          color: white !important;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          margin: 15px 0;
          font-weight: 500;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin-bottom: 8px;
        }
        @media only screen and (max-width: 480px) {
          .content {
            padding: 15px !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="gradient-text">BYNOPS</h1>
          <p>The Workspace That Knows Your Workflow</p>
        </div>
        
        <div class="content">
          <p>Dear ${formData.firstName || 'Valued Customer'},</p>
          
          <p>Thank you for contacting <strong>BYNOPS</strong>! We've received your message and our team will review it shortly.</p>
          
          <p>Here's a copy of your submission:</p>
          
          <ul>
            <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            ${formData.message ? `<li><strong>Message:</strong> ${formData.message}</li>` : ''}
          </ul>
          
          <p>We typically respond within 1-2 business days.</p>
          
          <div style="text-align: center;">
            <a href="https://bynops.com" class="button">Visit Our Website</a>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} BYNOPS. All rights reserved.</p>
        <p>
          <a href="https://bynops.com" style="color: #3b82f6; text-decoration: none;">Website</a> | 
          <a href="https://linkedin.com/company/bynops" style="color: #3b82f6; text-decoration: none;">LinkedIn</a>
        </p>
      </div>
    </body>
    </html>
    `.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const form = e.currentTarget as HTMLFormElement;
      const formDataObj = new FormData(form);
      
      // Add the properly encoded email template
      formDataObj.set('_autoresponse', generateEmailTemplate());
      formDataObj.set('_template', 'box');
      
      // Submit to formsubmit.co
      const response = await fetch('https://formsubmit.co/ajax/salamanderconcepts@gmail.com', {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        navigate('/thank-you');
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit form. Please try again or contact us directly.');
      
      // Fallback to traditional form submission with template
      if (formRef.current) {
        const fallbackForm = formRef.current;
        const templateInput = document.createElement('input');
        templateInput.type = 'hidden';
        templateInput.name = '_autoresponse';
        templateInput.value = generateEmailTemplate();
        fallbackForm.appendChild(templateInput);
        
        const displayInput = document.createElement('input');
        displayInput.type = 'hidden';
        displayInput.name = '_autoresponsedisplay';
        displayInput.value = 'html';
        fallbackForm.appendChild(displayInput);
        
        fallbackForm.submit();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>BYNOPS - Modern Workflow Solutions</title>
        <link rel="icon" type="image/x-icon" href={Favicon} />
        <meta name="description" content="The workspace that knows your workflow. Modernizing LSAM workflows to save time and money." />
        <meta property="og:image" content={SocialBanner} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex justify-center mb-12">
            <img 
              src={BynopsLogo}
              alt="Bynops Logo"
              className="h-16 object-contain"
              loading="lazy"
            />
          </div>

          <header className="mb-16 text-center bg-white rounded-xl p-8 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Workspace that Knows your Workflow
            </h1>
            
            <div className="mb-8">
              <p className="text-xl text-gray-700 mb-6">
                Bynops is assembling a dream team to bring faster, smarter loan servicing and asset management to life.
              </p>
              <button 
                onClick={scrollToForm}
                className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
              >
                Learn more
              </button>
            </div>
          </header>

          <section className="mb-16 bg-white rounded-xl p-8 shadow-lg">
            <p className="text-gray-700 mb-4">
              Inspired by firsthand experience, we're eager to bring much-needed innovation to the space.
            </p>
            <p className="text-gray-700">
              Bynops aims to modernize LSAM workflows, saving not only time, but also dollars.
            </p>
          </section>

          <section className="mb-16 bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Bynops is coming soon.</h2>
            <p className="text-gray-700 mb-8 text-center">
              We're building something new. Stay in the loop.
            </p>

            <form 
              ref={formRef}
              action="https://formsubmit.co/salamanderconcepts@gmail.com" 
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={`${window.location.origin}/thank-you`} />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_subject" value="New Contact from BYNOPS Website" />
              <input type="hidden" name="_autoresponsedisplay" value="html" />
              <input type="hidden" name="_replyto" value={formData.email} />
              <input type="hidden" name="_cc" value={formData.email} />
              <input type="text" name="_honey" style={{display: 'none'}} />
              
              {/* Form Fields */}
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
                    className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
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
                    className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                {submitError ? (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    {submitError}
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                )}
              </div>
            </form>
          </section>

          <footer className="text-center mt-20 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-center mb-4">
              <img 
                src={BynopsLogo}
                alt="Bynops Logo"
                className="h-12 object-contain"
              />
            </div>
            <p className="text-gray-600 font-medium mb-4">The Workspace that knows your workflow.</p>
            
            <div className="flex justify-center">
              <a 
                href="https://www.linkedin.com/company/bynops" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <LinkedInLogo />
                <span className="text-blue-600 font-medium">Follow us on LinkedIn</span>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LandingPage;